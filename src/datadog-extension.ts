import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as dd from '.';

export interface DataDogLambdaAspectProps {

  /**
   * Destination site for your metrics, traces, and logs.
   *
   * @default: DataDogSite.EU
   */
  readonly datadogSite?: dd.DataDogSite | undefined;

  // DD_FLUSH_TO_LOG
  // Set to true (recommended) to send custom metrics asynchronously (with no added latency to your Lambda function executions) through CloudWatch Logs
  // with the help of Datadog Forwarder. Defaults to false. If set to false, you also need to set DD_API_KEY and DD_SITE.

  // DD_API_KEY

  // If DD_FLUSH_TO_LOG is set to false (not recommended), the Datadog API Key must be defined by setting one of the following environment variables:

  //     DD_API_KEY - the Datadog API Key in plain-text, NOT recommended
  //     DD_KMS_API_KEY - the KMS-encrypted API Key, requires the kms:Decrypt permission
  //     DD_API_KEY_SECRET_ARN - the Secret ARN to fetch API Key from the Secrets Manager, requires the secretsmanager:GetSecretValue permission (and kms:Decrypt if using a customer managed CMK)
  //     DD_API_KEY_SSM_NAME - the Parameter Name to fetch API Key from the Systems Manager Parameter Store, requires the ssm:GetParameter permission (and kms:Decrypt if using a SecureString with a customer managed CMK)

  // DD_SITE

  // If DD_FLUSH_TO_LOG is set to false (not recommended), and your data need to be sent to the Datadog EU site, you must set DD_SITE to datadoghq.eu. Defaults to datadoghq.com.
  // DD_LOGS_INJECTION

  // Inject Datadog trace id into logs for correlation. Defaults to true.
  // DD_LOG_LEVEL

  // Set to debug enable debug logs from the Datadog Lambda Library. Defaults to info.
  // DD_ENHANCED_METRICS

  // Generate enhanced Datadog Lambda integration metrics, such as, aws.lambda.enhanced.invocations and aws.lambda.enhanced.errors. Defaults to true.
  // DD_LAMBDA_HANDLER

  // Your original Lambda handler.
  // DD_TRACE_ENABLED

  // Initialize the Datadog tracer when set to true. Defaults to false.
  // DD_MERGE_XRAY_TRACES

  // Set to true to merge the X-Ray trace and the Datadog trace, when using both the X-Ray and Datadog tracing. Defaults to false.

  /**
   * Version of DataDog extension layer for Node runtime.
   *
   * @default: 41
   */
  readonly nodeVersion?: string;
  /**
   * Version of DataDog extension layer for Python runtime.
   *
   * @default: 26
   */
  readonly pythonVersion?: string;
}

export class DataDogLambda implements cdk.IAspect {

  /**
   * Watches the given scope and adds alarms for known resources.
   */
  public static extendFuntions(scope: cdk.Construct, props?: DataDogLambdaAspectProps): void {
    const aspect = new DataDogLambda(props);
    cdk.Aspects.of(scope).add(aspect);
  }

  private readonly nodeVersion: string;
  private readonly pythonVersion: string;

  /**
   * Adds DataDog extension to lambda functions.
   *
   * Only Python (2.7, 3.6, 3.7 and 3.8) and Node (10.x and 12.x) runtimes are supported.
   */
  constructor(props?: DataDogLambdaAspectProps) {
    this.nodeVersion = props?.nodeVersion ?? '41';
    this.pythonVersion = props?.pythonVersion ?? '26';
  }

  public visit(node: cdk.IConstruct): void {
    if (node instanceof lambda.Function) {
      switch (node.runtime) {
        case lambda.Runtime.PYTHON_2_7:
          node.addLayers(lambda.LayerVersion.fromLayerVersionArn(node, 'DD-Extension', `arn:aws:lambda:${cdk.Stack.of(node).environment}:464622532012:layer:Datadog-Python27:${this.pythonVersion}`));
          node.addEnvironment('DD_LOGS_ENABLED', 'true');
          return;
        case lambda.Runtime.PYTHON_3_6:
          node.addLayers(lambda.LayerVersion.fromLayerVersionArn(node, 'DD-Extension', `arn:aws:lambda:${cdk.Stack.of(node).environment}:464622532012:layer:Datadog-Python36:${this.pythonVersion}`));
          node.addEnvironment('DD_LOGS_ENABLED', 'true');
          return;
        case lambda.Runtime.PYTHON_3_7:
          node.addLayers(lambda.LayerVersion.fromLayerVersionArn(node, 'DD-Extension', `arn:aws:lambda:${cdk.Stack.of(node).environment}:464622532012:layer:Datadog-Python37:${this.pythonVersion}`));
          node.addEnvironment('DD_LOGS_ENABLED', 'true');
          return;
        case lambda.Runtime.PYTHON_3_8:
          node.addLayers(lambda.LayerVersion.fromLayerVersionArn(node, 'DD-Extension', `arn:aws:lambda:${cdk.Stack.of(node).environment}:464622532012:layer:Datadog-Python38:${this.pythonVersion}`));
          node.addEnvironment('DD_LOGS_ENABLED', 'true');
          return;
        case lambda.Runtime.NODEJS_10_X:
          node.addLayers(lambda.LayerVersion.fromLayerVersionArn(node, 'DD-Extension', `arn:aws:lambda:${cdk.Stack.of(node).environment}:464622532012:layer:Datadog-Node10-x:${this.nodeVersion}`));
          node.addEnvironment('DD_LOGS_ENABLED', 'true');
          return;
        case lambda.Runtime.NODEJS_12_X:
          node.addLayers(lambda.LayerVersion.fromLayerVersionArn(node, 'DD-Extension', `arn:aws:lambda:${cdk.Stack.of(node).environment}:464622532012:layer:Datadog-Node12-x:${this.nodeVersion}`));
          node.addEnvironment('DD_LOGS_ENABLED', 'true');
          return;
        default:
          return;
      }
    }
  }
}
