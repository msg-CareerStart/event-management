import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as rds from '@aws-cdk/aws-rds';
import { AutoScalingGroup } from '@aws-cdk/aws-autoscaling';
import {
  ApplicationLoadBalancer,
  ApplicationProtocol,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import * as logs from '@aws-cdk/aws-logs';
import * as acm from '@aws-cdk/aws-certificatemanager';

export class CloudEventManagementStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    cdk.Tags.of(this).add('cloud', 'event-management');

    //vpc
    //our network env
    const vpc = new ec2.Vpc(this, 'VPC');

    //security groups, telling comps what to do

    // A load balancer distributes incoming application traffic across multiple EC2 instances in multiple Availability Zones.
    //This increases the fault tolerance of your applications.

    //load balancer security group
    const lbSG = new ec2.SecurityGroup(this, 'LB-SG', {
      vpc,
      allowAllOutbound: true,
      description: 'Security group for the load balancer',
    });

    //ingress and egress rules let us specify where we get or deliver things

    lbSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTP traffic for the load balancer'
    );
    //lbSG.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP traffic for the load balancer');

    // app security group
    const appSG = new ec2.SecurityGroup(this, 'App-SG', {
      vpc,
      description: 'Security group for the application',
    });

    appSG.addIngressRule(
      lbSG,
      ec2.Port.tcp(8080),
      'Allow HTTP traffic from the load balancer'
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

    // app tier - auto scaling group
    // auto scaling for our app

    const asg = new AutoScalingGroup(this, 'ASG', {
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.genericLinux({
        'eu-west-1': 'ami-063d4ab14480ac177',
      }),
      vpc,
      minCapacity: 1,
      maxCapacity: 2,
      securityGroup: appSG,
      vpcSubnets: { subnets: vpc.publicSubnets },
    });

    //dbSecret.grantRead(asg.role);

    const db = rds.DatabaseInstance.fromDatabaseInstanceAttributes(this, 'db', {
      securityGroups: [dbSG],
      port: 3306,
      instanceEndpointAddress:
        'event-management-db.c1i49kbi7ss8.eu-west-1.rds.amazonaws.com',
      instanceIdentifier: 'event-management-db',
    });

    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });
    cluster.addAutoScalingGroup(asg);

    // Create Task Definition
    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');
    const container = taskDefinition.addContainer('web', {
      image: ecs.ContainerImage.fromRegistry(
        'erwinhilbert/event-management:testV2'
      ),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'backend_2231212',
        logGroup: new logs.LogGroup(this, 'logs', {
          logGroupName: 'backend_2231212',
        }),
      }),
      memoryLimitMiB: 512,
      environment: {
        //https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-rds.html#java-rds-javase
        SPRING_PROFILES_ACTIVE: 'test',
        //rds to do
      },
    });

    container.addPortMappings({
      containerPort: 8080,
      protocol: ecs.Protocol.TCP,
    });

    // Create Service
    const service = new ecs.Ec2Service(this, 'Service', {
      cluster,
      taskDefinition,
    });

    // Create ALB
    const lb = new ApplicationLoadBalancer(this, 'LB', {
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
      protocol: ApplicationProtocol.HTTPS,
    });

    // Attach ALB to ECS Service
    listener.addTargets('ECS', {
      port: 8080,
      protocol: ApplicationProtocol.HTTP,
      targets: [
        service.loadBalancerTarget({
          containerName: 'web',
          containerPort: 8080,
        }),
      ],
      /*
      healthCheck: {
        enabled: true,
        healthyHttpCodes: '403',
        path: '/',
      },
      */
      // if i remove the health check i get draining, if i let it with 403 i get unhealthy
    });

    //security policy
    // ssl certificate for http and https

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: lb.loadBalancerDnsName,
    });
  }
}
