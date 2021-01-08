import * as lambda from '@aws-cdk/aws-lambda';
import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';
import * as dd from '.';

export interface DataDogLambdaAspectProps {

  /**
   * Destination site for your metrics, traces, and logs.
   *
   * @default: DataDogSite.US
   */
  readonly datadogSite?: dd.DataDogSite | undefined;

  /**
   * Defines the DataDog API Key.
   *
   * A string will be mapped to DD_API_KEY env variable in plain-text (NOT recommended)
   * An SSM StringParamter (optional secure) is mapped to either DD_API_KEY_SECRET_ARN or DD_API_KEY_SSM_NAME.
   */
  readonly dataDogApiKey: string | ssm.IStringParameter;

  /**
   * Inject Datadog trace id into logs for correlation.
   *
   * @default: true
   */
  readonly logsInjection?: boolean;

  /**
   * Generate enhanced Datadog Lambda integration metrics, such as, aws.lambda.enhanced.invocations and aws.lambda.enhanced.errors.
   *
   * @default: true
   */
  readonly enhancedMetrics?: boolean;

  // DD_LAMBDA_HANDLER
  // Your original Lambda handler.

  /**
   * Initialize the Datadog tracer when set to true.
   *
   * @default: false
   */
  readonly tracing?: boolean;

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

/**
 * Adds DataDog layer to supported lambda functions.
 */
export class DataDogLambda implements cdk.IAspect {

  /**
   * Adds DataDog layer to supported lambda functions.
   */
  public static extendFuntions(scope: cdk.Construct, props: DataDogLambdaAspectProps): void {
    const aspect = new DataDogLambda(props);
    cdk.Aspects.of(scope).add(aspect);
  }

  private readonly nodeVersion: string;
  private readonly pythonVersion: string;
  private readonly enhancedMetrics: boolean;
  private readonly tracing: boolean;
  private readonly logsInjection: boolean;
  private readonly datadogSite: dd.DataDogSite;
  private readonly dataDogApiKey: string | ssm.IStringParameter;

  /**
   * Adds DataDog extension to lambda functions.
   *
   * Only Python (2.7, 3.6, 3.7 and 3.8) and Node (10.x and 12.x) runtimes are supported.
   */
  constructor(props: DataDogLambdaAspectProps) {
    this.nodeVersion = props?.nodeVersion ?? '41';
    this.pythonVersion = props?.pythonVersion ?? '26';
    this.tracing = props?.tracing ?? false;
    this.enhancedMetrics = props?.enhancedMetrics ?? true;
    this.logsInjection = props?.logsInjection ?? true;
    this.datadogSite = props?.datadogSite ?? dd.DataDogSite.US;
    this.dataDogApiKey = props.dataDogApiKey;
  }

  public visit(node: cdk.IConstruct): void {
    if (node instanceof lambda.Function) {
      const layer = this.getLambdaLayer(node);
      if (layer) {
        node.addLayers(lambda.LayerVersion.fromLayerVersionArn(node, 'DD-Extension', layer));
        node.addEnvironment('DD_FLUSH_TO_LOG', 'false');
        node.addEnvironment('DD_LOGS_ENABLED', 'true');
        node.addEnvironment('DD_TRACE_ENABLED', this.tracing.toString());
        node.addEnvironment('DD_ENHANCED_METRICS', this.enhancedMetrics.toString());
        node.addEnvironment('DD_LOGS_INJECTION', this.logsInjection.toString());
        node.addEnvironment('DD_SITE', this.datadogSite);

        if (typeof this.dataDogApiKey === 'string') {
          node.addEnvironment('DD_API_KEY', this.dataDogApiKey);
        } else {
          // allow lambda function to read the value
          this.dataDogApiKey.grantRead(node);

          if (this.dataDogApiKey.parameterType === ssm.ParameterType.SECURE_STRING) {
            node.addEnvironment('DD_API_KEY_SECRET_ARN', this.dataDogApiKey.parameterArn);
          } else if (this.dataDogApiKey.parameterType === ssm.ParameterType.STRING) {
            node.addEnvironment('DD_API_KEY_SSM_NAME', this.dataDogApiKey.parameterName);
          } else {
            throw Error('DataDogApiKey must be a String or SecureString parameter');
          }
        }
      }
    }
  }

  private getLambdaLayer(func: lambda.Function): string | undefined {
    switch (func.runtime) {
      case lambda.Runtime.PYTHON_2_7:
        return `arn:aws:lambda:${cdk.Stack.of(func).environment}:464622532012:layer:Datadog-Python27:${this.pythonVersion}`;
      case lambda.Runtime.PYTHON_3_6:
        return `arn:aws:lambda:${cdk.Stack.of(func).environment}:464622532012:layer:Datadog-Python36:${this.pythonVersion}`;
      case lambda.Runtime.PYTHON_3_7:
        return `arn:aws:lambda:${cdk.Stack.of(func).environment}:464622532012:layer:Datadog-Python37:${this.pythonVersion}`;
      case lambda.Runtime.PYTHON_3_8:
        return `arn:aws:lambda:${cdk.Stack.of(func).environment}:464622532012:layer:Datadog-Python38:${this.pythonVersion}`;
      case lambda.Runtime.NODEJS_10_X:
        return `arn:aws:lambda:${cdk.Stack.of(func).environment}:464622532012:layer:Datadog-Node10-x:${this.nodeVersion}`;
      case lambda.Runtime.NODEJS_12_X:
        return `arn:aws:lambda:${cdk.Stack.of(func).environment}:464622532012:layer:Datadog-Node12-x:${this.nodeVersion}`;
      default:
        return undefined;
    }
  }
}