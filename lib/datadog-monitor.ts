import * as cdk from '@aws-cdk/core';
import { DataDogCredentials } from './DataDog';

export enum MonitorType {
  ANOMALY = "query alert",
  APM = "query alert",
  COMPOSITE = "composite",
  CUSTOM = "service check",
  EVENT = "event alert",
  FORECAST = "query alert",
  HOST = "service check",
  INTEGRATION = "query alert", // or service check
  LIVE = "process	process alert",
  LOGS = "log alert",
  METRIC = "metric alert",
  NETWORK = "service check",
  OUTLIER = "query alert",
  PROCESS = "service check",
  WATCHDOG = "event alert",
}

export interface DataDogMonitorProps {
  readonly creds: DataDogCredentials;
  readonly type: MonitorType;
  readonly query: string;
  readonly name: string;
  readonly message: string;
  // todo: tags
  // todo: readonly options: MonitorOptions;
}

export class DataDogMonitor extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: DataDogMonitorProps) {
    super(scope, id);

    new cdk.CfnResource(this, 'DataDogMonitor', {
      type: 'Datadog::Monitors::Monitor',
      properties: {
        Type: props.type,
        Query: props.query,
        Name: props.name,
        DatadogCredentials: {
          ApiURL: 'https://' + props.creds.datadogSite,
          ApiKey: props.creds.datadogApiKey,
          ApplicationKey: props.creds.datadogAppKey
        }
      }
    });
  }
}

// export class AppStack extends cdk.Stack {
//     constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
//         super(scope, id, props);

//         // ssm.StringParameter.valueForSecureStringParameter(this, '/landingzone/datadog/eu/api-key', 1);
//         var apiKey = new cdk.CfnParameter(this, 'DataDogApiKey', { 
//           default: '/landingzone/datadog/eu/api-key',
//           noEcho: true,
//           type: 'AWS::SSM::Parameter::Value<String>'
//         });
//         var appKey = new cdk.CfnParameter(this, 'DataDogAppKey', { 
//           default: '/landingzone/datadog/eu/application-key',
//           noEcho: true,
//           type: 'AWS::SSM::Parameter::Value<String>'
//         });

//         // var apiKey = ssm.StringParameter.fromStringParameterName(this, 'DataDogApiKey', '/landingzone/datadog/eu/api-key');
//         // var appKey = ssm.StringParameter.fromStringParameterName(this, 'DataDogAppKey', '/landingzone/datadog/eu/app-key');

//         var datadogMonitor = new DataDogMonitor(this, 'MyDataDogMonitor', {
//           datadogApiKey: apiKey.valueAsString,
//           datadogAppKey: appKey.valueAsString,
//           name: 'my monitor',
//           message: 'some message',
//           datadogSite: DataDogSite.eu,
//           query: 'avg(last_1h):sum:system.cpu.system{host:host0} > 100',
//           type: MonitorType.anomaly
//         });

//         // You should stop here
//     }
// }