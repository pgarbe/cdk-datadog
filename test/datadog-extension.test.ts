import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';
import * as dd from '../src/';

test('Lambda extension sets layer and env variables', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  new lambda.Function(stack, 'lambda', {
    runtime: lambda.Runtime.NODEJS_12_X,
    code: lambda.Code.fromInline('hello'),
    handler: 'handler',
  });

  // WHEN
  dd.DataDogLambda.extendFuntions(stack, { dataDogApiKey: 'myapikey' });

  // THEN
  expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        DD_API_KEY: 'myapikey',
        DD_LOGS_ENABLED: 'true',
      },
    },
    Layers: [
      'arn:aws:lambda:aws://unknown-account/unknown-region:464622532012:layer:Datadog-Node12-x:41',
    ],
  }));
});

test('ApiKey as string parameter requires permissions', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  new lambda.Function(stack, 'lambda', {
    runtime: lambda.Runtime.NODEJS_12_X,
    code: lambda.Code.fromInline('hello'),
    handler: 'handler',
  });

  // WHEN
  const param = ssm.StringParameter.fromStringParameterName(stack, 'dataDogApiKey', '/config/datadog/apikey');
  dd.DataDogLambda.extendFuntions(stack, { dataDogApiKey: param });

  // THEN
  expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        DD_API_KEY_SSM_NAME: '/config/datadog/apikey',
      },
    },
  }));
});

test('ApiKey as secure string parameter requires permissions', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  new lambda.Function(stack, 'lambda', {
    runtime: lambda.Runtime.NODEJS_12_X,
    code: lambda.Code.fromInline('hello'),
    handler: 'handler',
  });

  // WHEN
  const param = ssm.StringParameter.fromSecureStringParameterAttributes(stack, 'dataDogApiKey', { parameterName: '/config/datadog/apikey', version: 2 });
  dd.DataDogLambda.extendFuntions(stack, { dataDogApiKey: param });

  // THEN
  expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        DD_API_KEY_SECRET_ARN: {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':ssm:',
              {
                Ref: 'AWS::Region',
              },
              ':',
              {
                Ref: 'AWS::AccountId',
              },
              ':parameter/config/datadog/apikey',
            ],
          ],
        },
      },
    },
  }));
});
