import * as cdk from '@aws-cdk/core';
import { Stack } from '@aws-cdk/core';
import { DataDogCredentials } from './DataDog';

export interface DataDogIntegrationProps {
  readonly roleName: string;
  readonly creds: DataDogCredentials;
}

export class DataDogIntegration extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: DataDogIntegrationProps) {
    super(scope, id);

    new cdk.CfnResource(this, 'DataDogAwsIntegration', {
      type: 'Datadog::Integrations::AWS',
      properties: {
        AccountID: Stack.of(this).account,
        RoleName: props.roleName,
        FilterTags: [], // ["filter:thisTag"];
        HostTags: [], // ["env:staging", "account:123456"]
        AccountSpecificNamespaceRules: {}, // {"api_gateway": true, "route53": false},

        DatadogCredentials: {
          ApiURL: 'https://api.' + props.creds.datadogSite,
          ApiKey: props.creds.datadogApiKey,
          ApplicationKey: props.creds.datadogAppKey
        }
      }
    });
  }
}
