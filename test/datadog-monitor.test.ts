import cdk = require('@aws-cdk/core');
import { SynthUtils } from '@aws-cdk/assert';
import { DataDogMonitor, MonitorType } from '../lib/datadog-monitor';
import { DataDogCredentials, DataDogSite } from '../lib/DataDog';

test('Sidecar sets all necessary properties', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
//   const param = new StringParameter(stack, 'SecureParameter', { type: ParameterType.SECURE_STRING, stringValue: 'mySecret' });

  // WHEN
  const dataDogCreds: DataDogCredentials = {
    datadogApiKey: '',
    datadogAppKey: '',
    datadogSite: DataDogSite.EU
  }

  new DataDogMonitor(stack, 'MyTestConstruct', { 
    creds: dataDogCreds,
    query: '',
    name: '',
    type: MonitorType.METRIC,
    message: ''
  });

  // THEN
  const monitor = SynthUtils.synthesize(stack).template.Resources.MyTestConstructDataDogMonitorF678180F;

  // The right image is used
  expect(monitor.Type).toBe('Datadog::Monitors::Monitor');

});
