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

export class CloudEventManagementStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    cdk.Tags.of(this).add('project', 'event-management');

    const vpc = new ec2.Vpc(this, 'VPC', { natGateways: 0 });

    //load balancer security group
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
      description: 'SG for the application',
    });

    dbSG.addIngressRule(
      appSG,
      ec2.Port.tcp(3306),
      'Allow My sql traffic from the application'
    );

    const asg = new AutoScalingGroup(this, 'ASG', {
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

    //dbSecret.grantRead(asg.role);

    rds.DatabaseInstance.fromDatabaseInstanceAttributes(this, 'db', {
      securityGroups: [dbSG],
      port: 3306,
      instanceEndpointAddress:
        'event-management-db.c1i49kbi7ss8.eu-west-1.rds.amazonaws.com',
      instanceIdentifier: 'event-management-db',
    });

    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });
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
      'a5cbdf63a8b3b4d7cdcc33b7eca3864f6ee71014'
    );

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');
    taskDefinition.addContainer('web', {
      image,
      memoryLimitMiB: 512,
      environment: {
        //https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-rds.html#java-rds-javase
        SPRING_PROFILES_ACTIVE: 'test',
        //rds to do
      },
      portMappings: [{ containerPort: 8080, hostPort: 8080 }],
    });

    const service = new ecs.Ec2Service(this, 'Service', {
      cluster,
      taskDefinition,
    });

    const lb = new ApplicationLoadBalancer(this, 'ALB', {
      vpc,
      internetFacing: true,
      securityGroup: lbSG,
      vpcSubnets: { subnets: vpc.publicSubnets },
    });

    const cert = acm.Certificate.fromCertificateArn(
      this,
      'Certificate',
      'arn:aws:acm:eu-west-1:026709880083:certificate/8095d922-a477-4c1d-8215-b1c0e3378588'
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

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: lb.loadBalancerDnsName,
    });
  }
}
