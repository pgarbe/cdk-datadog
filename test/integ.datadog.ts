#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { DataDogIntegration } from '../lib/datadog-integration';
import { DataDogSite } from '../lib/DataDog';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'cdk-datadog-');

new DataDogIntegration(stack, 'Integration', {
  creds: {
    datadogSite: DataDogSite.EU,
    datadogApiKey: 'secret'
  },
  roleName: 'datadog-role'
});


// new cdk.CfnOutput(stack, 'MessageId', { value: cdk.Token.asString(snsPublish.getData('MessageId')) });

app.synth();