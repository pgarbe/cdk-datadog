import { SynthUtils } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import CdkDatadog = require('../lib/datadog-monitor');
import { SecretValue } from '@aws-cdk/core';
import { DataDogSite } from "../lib/DataDog";

test('Custom Resource created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  const secret = new SecretValue('foo');

  // WHEN
  new CdkDatadog.DataDogMonitor(stack, 'MyTestConstruct', { 
    creds: {
      datadogApiKey: secret.toString(),
      datadogAppKey: secret.toString(),
      datadogSite: DataDogSite.EU,
    },
    name: 'name',
    query: 'query',
    message: 'message',
    type: CdkDatadog.MonitorType.WATCHDOG
  });

  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
