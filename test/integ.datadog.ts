#!/usr/bin/env ts-node
import * as lambda from '@aws-cdk/aws-lambda';
import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';
import * as dd from '../src';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'cdk-datadog-integrationtest');

new lambda.Function(stack, 'lambda', {
  runtime: lambda.Runtime.NODEJS_12_X,
  code: lambda.Code.fromInline('hi'),
  handler: 'handler',
});

const dataDogApiKey = ssm.StringParameter.fromStringParameterName(stack, 'dataDogApiKey', '');
dd.DataDogLambda.extendFuntions(stack, {
  dataDogApiKey,
});


app.synth();