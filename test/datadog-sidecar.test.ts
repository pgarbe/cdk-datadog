import cdk = require('@aws-cdk/core');
import { SynthUtils } from '@aws-cdk/assert';
import CdkDatadog = require('../lib/datadog-sidecar');
import { Compatibility, Secret, ContainerImage } from '@aws-cdk/aws-ecs';
import { ParameterType, StringParameter } from '@aws-cdk/aws-ssm';
import { deepEqual } from '@aws-cdk/cloudformation-diff';
import '../lib/datadog-sidecar';
import { TaskDefinition } from '@aws-cdk/aws-ecs/lib/base/task-definition';

test('Sidecar sets all necessary properties', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  const param = new StringParameter(stack, 'SecureParameter', { type: ParameterType.SECURE_STRING, stringValue: 'mySecret' });
  const secret = Secret.fromSsmParameter(param);
  const taskDefinition = new TaskDefinition(stack, 'TaskDefinition', {
    compatibility: Compatibility.EC2
  })

  // WHEN
  // taskDefinition.withDataDogSidecar({ 
  //   datadogApiKey: secret,
  // });

  new CdkDatadog.DatadogSidecar(stack, 'MyTestConstruct', taskDefinition, { 
    datadogApiKey: secret,
  });

  // THEN
  const sidecarContainerDefinition = SynthUtils.synthesize(stack).template.Resources.TaskDefinitionB36D86D9;

  // The right image is used
  expect(sidecarContainerDefinition.Properties.ContainerDefinitions[0].Image).toBe('datadog/docker-dd-agent');

  // CPU and Memory is set
  expect(sidecarContainerDefinition.Properties.ContainerDefinitions[0].Cpu).toBe(64);
  expect(sidecarContainerDefinition.Properties.ContainerDefinitions[0].Memory).toBe(128);

  // Ports needs to be defined
  expect(deepEqual(sidecarContainerDefinition.Properties.ContainerDefinitions[0].PortMappings,
    [
      {"ContainerPort": 8126, "HostPort": 0, "Protocol": "tcp"}, 
      {"ContainerPort": 8125, "HostPort": 0, "Protocol": "tcp"}
    ]
  )).toBeTruthy()

  // API Keys is read from secret
  expect(deepEqual(sidecarContainerDefinition.Properties.ContainerDefinitions[0].Secrets,
      [{
        "Name":"DD_API_KEY",
        "ValueFrom":{
          "Fn::Join":["",["arn:",{"Ref":"AWS::Partition"},":ssm:",{"Ref":"AWS::Region"},":",{"Ref":"AWS::AccountId"},":parameter/",{"Ref":"SecureParameterBD2C05A8"}]]}
        }
      ]
  )).toBeTruthy()

  // Default settings are set
  expect(deepEqual(sidecarContainerDefinition.Properties.ContainerDefinitions[0].Environment,
    [
      { 'Name':'ECS_FARGATE', 'Value':'true' },
      { 'Name':'DD_APM_ENABLED', 'Value':'true' },
      { 'Name':'DD_JMXFETCH_ENABLED', 'Value':'true' },
      { 'Name':'DD_SITE', 'Value':'datadoghq.com' },
    ]
  )).toBeTruthy();
});

test('Sidecar applies Tags', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  const param = new StringParameter(stack, 'SecureParameter', { type: ParameterType.SECURE_STRING, stringValue: 'mySecret' });
  const secret = Secret.fromSsmParameter(param);
  const taskDefinition = new TaskDefinition(stack, 'TaskDefinition', {
    compatibility: Compatibility.EC2
  });
  cdk.Tag.add(app, 'company', 'myCompany');
  cdk.Tag.add(app, 'team', 'myTeam');

  // WHEN
  new CdkDatadog.DatadogSidecar(stack, 'MyTestConstruct', taskDefinition, { 
    datadogApiKey: secret,
  });

  // THEN
  const sidecarContainerDefinition = SynthUtils.synthesize(stack).template.Resources.TaskDefinitionB36D86D9;
  expect(deepEqual(sidecarContainerDefinition.Properties.ContainerDefinitions[0].Environment,
      [
        { 'Name':'ECS_FARGATE', 'Value':'true' },
        { 'Name':'DD_APM_ENABLED', 'Value':'true' },
        { 'Name':'DD_JMXFETCH_ENABLED', 'Value':'true' },
        { 'Name':'DD_SITE', 'Value':'datadoghq.com' },
        { 'Name':'DD_DOGSTATSD_TAGS', 'Value':'["company:myCompany","team:myTeam"]' },
        // TODO: DD_TAGS
        // TODO: Can agent also read tags from ecs task?
      ]
  )).toBeTruthy();
});

test('Sidecar is a dependency of app container', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  const param = new StringParameter(stack, 'SecureParameter', { type: ParameterType.SECURE_STRING, stringValue: 'mySecret' });
  const secret = Secret.fromSsmParameter(param);
  const taskDefinition = new TaskDefinition(stack, 'TaskDefinition', {
    compatibility: Compatibility.EC2
  });
  taskDefinition.addContainer('myApp', {
    image: ContainerImage.fromRegistry('busybox'),
    memoryLimitMiB: 128
  });

  // WHEN
  new CdkDatadog.DatadogSidecar(stack, 'MyTestConstruct', taskDefinition, { 
    datadogApiKey: secret,
  });

  // THEN
  const appContainerDefinition = SynthUtils.synthesize(stack).template.Resources.TaskDefinitionB36D86D9;
  expect(deepEqual(appContainerDefinition.Properties.ContainerDefinitions[0].DependsOn,
      [{Condition: "SUCCESS", ContainerName: "dd-agent"}]
    )).toBeTruthy();
});
