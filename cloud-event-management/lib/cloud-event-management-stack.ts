import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as rds from '@aws-cdk/aws-rds';
import { AutoScalingGroup } from '@aws-cdk/aws-autoscaling';
import {
  ApplicationLoadBalancer,
  ApplicationProtocol,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import * as acm from '@aws-cdk/aws-certificatemanager';
import { Repository } from '@aws-cdk/aws-ecr';
import { Duration } from '@aws-cdk/core';
import { Secret } from '@aws-cdk/aws-secretsmanager';

export class CloudEventManagementStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const certificateArn = new cdk.CfnParameter(this, 'certificateARN', {
      description:
        'The ARN of the certificate used for load balancer HTTPS listener',
    });

    const imageTag = new cdk.CfnParameter(this, 'imageTag', {
      description:
        'The tag of the docker image from ECR',
    });

    cdk.Tags.of(this).add('project', 'event-management');

    const vpc = new ec2.Vpc(this, 'VPC', { natGateways: 0 });

    const { appSG, dbSG, lbSG } = this.setupSecurityGroups(vpc);

    const asg = this.setupASG(vpc, appSG);

    const db = this.setupRDS(dbSG);

    const service = this.setupECS(vpc, asg, db, imageTag.valueAsString);

    const lb = this.setupLoadBalancer(
      vpc,
      lbSG,
      service,
      certificateArn.valueAsString
    );

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: lb.loadBalancerDnsName,
    });
  }

  private setupASG(vpc: ec2.Vpc, appSG: ec2.SecurityGroup) {
    return new AutoScalingGroup(this, 'ASG', {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
      minCapacity: 1,
      maxCapacity: 1,
      securityGroup: appSG,
      vpcSubnets: { subnets: vpc.publicSubnets },
    });
  }

  private setupRDS(dbSG: ec2.SecurityGroup) {
    return rds.DatabaseInstance.fromDatabaseInstanceAttributes(this, 'db', {
      securityGroups: [dbSG],
      port: 3306,
      instanceEndpointAddress:
        'event-management-db.c1i49kbi7ss8.eu-west-1.rds.amazonaws.com',
      instanceIdentifier: 'event-management-db',
    });
  }

  private setupSecurityGroups(vpc: ec2.Vpc) {
    const lbSG = new ec2.SecurityGroup(this, 'LB-SG', {
      vpc,
      description: 'Security group for the load balancer',
    });

    lbSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTP traffic for the load balancer'
    );

    const appSG = new ec2.SecurityGroup(this, 'App-SG', {
      vpc,
      description: 'Security group for the application',
    });

    appSG.addIngressRule(
      lbSG,
      ec2.Port.allTcp(),
      'Allow traffic from the load balancer'
    );

    //db sg
    const dbSG = new ec2.SecurityGroup(this, 'DB-SG', {
      vpc,
      description: 'SG for the database',
    });

    dbSG.addIngressRule(
      appSG,
      ec2.Port.tcp(3306),
      'Allow MySQL traffic from the application'
    );
    return { appSG, dbSG, lbSG };
  }

  private setupECS(
    vpc: ec2.Vpc,
    asg: AutoScalingGroup,
    db: rds.IDatabaseInstance,
    tag: string
  ) {
    const cluster = new ecs.Cluster(this, 'EcsCluster', {
      vpc,
      clusterName: 'event-management-cluster',
    });
    const capacityProvider = new ecs.AsgCapacityProvider(
      this,
      'AsgCapacityProvider',
      {
        autoScalingGroup: asg,
      }
    );
    cluster.addAsgCapacityProvider(capacityProvider);

    // Create Task Definition
    const image = ecs.ContainerImage.fromEcrRepository(
      Repository.fromRepositoryName(this, 'ECR-Repo', 'event-managment'),
      tag
    );

    const dbSecret = Secret.fromSecretNameV2(
      this,
      'DB-Secret',
      'prodDB'
    );

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');
    taskDefinition.addContainer('web', {
      image,
      memoryLimitMiB: 512,
      environment: {
        SPRING_PROFILES_ACTIVE: 'prod',
        DB_URL: db.instanceEndpoint.hostname
      },
      secrets: {
        DB_USERNAME: ecs.Secret.fromSecretsManager(dbSecret, 'username'),
        DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret, 'password'),
      },
      portMappings: [{ containerPort: 8080, hostPort: 8080 }],
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'event-management-ecs' })
    });

    const service = new ecs.Ec2Service(this, 'Service', {
      cluster,
      taskDefinition,
      serviceName: 'event-management-cluster',
    });
    return service;
  }

  private setupLoadBalancer(
    vpc: ec2.Vpc,
    lbSG: ec2.SecurityGroup,
    service: ecs.Ec2Service,
    certificateArn: string
  ) {
    const lb = new ApplicationLoadBalancer(this, 'ALB', {
      vpc,
      internetFacing: true,
      securityGroup: lbSG,
      vpcSubnets: { subnets: vpc.publicSubnets },
    });

    const cert = acm.Certificate.fromCertificateArn(
      this,
      'Certificate',
      certificateArn
    );

    const listener = lb.addListener('PublicHTTPSListener', {
      port: 443,
      open: true,
      certificates: [cert],
    });

    // Attach ALB to ECS Service
    listener.addTargets('ECS', {
      port: 8080,
      protocol: ApplicationProtocol.HTTP,
      targets: [service],
      healthCheck: {
        enabled: true,
        healthyHttpCodes: '403',
        path: '/',
        interval: Duration.seconds(300),
      },
    });
    return lb;
  }
}
