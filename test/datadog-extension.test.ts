import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as lambda from '@aws-cdk/aws-lambda';
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
  dd.DataDogLambda.extendFuntions(stack);

  // THEN
  expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        DD_LOGS_ENABLED: 'true',
      },
    },
    Layers: [
      'arn:aws:lambda:aws://unknown-account/unknown-region:464622532012:layer:Datadog-Node12-x:41',
    ],
  }));
});

