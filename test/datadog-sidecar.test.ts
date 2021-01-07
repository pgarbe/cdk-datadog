import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';
import * as dd from '../src';

test('Sidecar sets all necessary properties', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  const param = new ssm.StringParameter(stack, 'SecureParameter', { type: ssm.ParameterType.SECURE_STRING, stringValue: 'mySecret' });
  const secret = ecs.Secret.fromSsmParameter(param);
  const taskDefinition = new ecs.TaskDefinition(stack, 'TaskDefinition', {
    compatibility: ecs.Compatibility.FARGATE,
    cpu: '1024',
    memoryMiB: '2048',
  });

  // WHEN
  dd.DataDogSidecar.addToTaskDefinition(
    taskDefinition,
    {
      datadogApiKey: secret,
    },
  );

  // THEN
  expectCDK(stack).to(haveResourceLike('AWS::ECS::TaskDefinition', {
    ContainerDefinitions: [
      {
        Name: 'dd-agent',
        Image: 'public.ecr.aws/datadog/agent:7-jmx', // The right image is used
        Cpu: 64, // CPU and Memory is set
        Memory: 128,
        PortMappings: [ // Ports needs to be defined
          { ContainerPort: 8126, Protocol: 'tcp' },
          { ContainerPort: 8125, Protocol: 'tcp' },
        ],
        Secrets: [ // API Keys is read from secret
          {
            Name: 'DD_API_KEY',
            ValueFrom: { 'Fn::Join': ['', ['arn:', { Ref: 'AWS::Partition' }, ':ssm:', { Ref: 'AWS::Region' }, ':', { Ref: 'AWS::AccountId' }, ':parameter/', { Ref: 'SecureParameterBD2C05A8' }]] },
          },
        ],
        Environment: [ // Default settings are set
          { Name: 'ECS_FARGATE', Value: 'true' },
          { Name: 'DD_APM_ENABLED', Value: 'true' },
          { Name: 'DD_JMXFETCH_ENABLED', Value: 'true' },
          { Name: 'DD_SITE', Value: 'datadoghq.eu' },
        ],
      },
    ],
  }));
});

test('Sidecar applies Tags', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  const param = new ssm.StringParameter(stack, 'SecureParameter', { type: ssm.ParameterType.SECURE_STRING, stringValue: 'mySecret' });
  const secret = ecs.Secret.fromSsmParameter(param);
  const taskDefinition = new ecs.TaskDefinition(stack, 'TaskDefinition', {
    compatibility: ecs.Compatibility.FARGATE,
    cpu: '1024',
    memoryMiB: '2048',
  });
  cdk.Tags.of(app).add('company', 'myCompany');
  cdk.Tags.of(app).add('team', 'myTeam');

  // WHEN
  new dd.DataDogSidecar(stack, 'MyTestConstruct', taskDefinition, {
    datadogApiKey: secret,
  });

  // THEN
  expectCDK(stack).to(haveResourceLike('AWS::ECS::TaskDefinition', {
    ContainerDefinitions: [
      {
        Name: 'dd-agent',
        Environment: [ // Default settings are set
          { Name: 'ECS_FARGATE', Value: 'true' },
          { Name: 'DD_APM_ENABLED', Value: 'true' },
          { Name: 'DD_JMXFETCH_ENABLED', Value: 'true' },
          { Name: 'DD_SITE', Value: 'datadoghq.eu' },
          { Name: 'DD_DOGSTATSD_TAGS', Value: '["company:myCompany","team:myTeam"]' },
          {
            Name: 'DD_TAGS',
            Value: {
              'Fn::Join': [
                '',
                [
                  'company:myCompany team:myTeam account_id:',
                  {
                    Ref: 'AWS::AccountId',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  }));
});

test('Sidecar is a dependency of app container', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  const param = new ssm.StringParameter(stack, 'SecureParameter', { type: ssm.ParameterType.SECURE_STRING, stringValue: 'mySecret' });
  const secret = ecs.Secret.fromSsmParameter(param);
  const taskDefinition = new ecs.TaskDefinition(stack, 'TaskDefinition', {
    compatibility: ecs.Compatibility.EC2,
  });
  taskDefinition.addContainer('myApp', {
    image: ecs.ContainerImage.fromRegistry('busybox'),
    memoryLimitMiB: 128,
  });

  // WHEN
  new dd.DataDogSidecar(stack, 'MyTestConstruct', taskDefinition, {
    datadogApiKey: secret,
  });

  // THEN
  expectCDK(stack).to(haveResourceLike('AWS::ECS::TaskDefinition', {
    ContainerDefinitions: [
      {
        Name: 'myApp',
        DependsOn: [{ Condition: 'SUCCESS', ContainerName: 'dd-agent' }],
      },
    ],
  }));
});
