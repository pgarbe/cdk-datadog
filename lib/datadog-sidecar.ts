import * as cdk from '@aws-cdk/core';
import { DataDogSite } from './DataDog';
import * as ecs from '@aws-cdk/aws-ecs';
import { TaskDefinition } from '@aws-cdk/aws-ecs';

// declare module '@aws-cdk/aws-ecs' {
  // interface TaskDefinition {
  //   withDataDogSidecar(this: TaskDefinition, props: DataDogIntegrationProps): void;
  // }
// }

// TaskDefinition.prototype.withDataDogSidecar = function withDataDogSidecar(this: TaskDefinition, props: DataDogIntegrationProps) {
//   new DatadogSidecar((this as any), 'DataDogAgent', this, props);
// }


export interface DataDogIntegrationProps {
  /**
   * The secret that stores the Datadog API key.
   */
  readonly datadogApiKey: ecs.Secret;

  /**
   * Destination site for your metrics, traces, and logs. Default: DataDogSite.us
   */
  readonly datadogSite?: DataDogSite | undefined;

  /**
   * Enable trace collection with the Trace Agent. Default: true
   */
  readonly apmEnabled?: Boolean | undefined

  /**
   * Enable collection of JMX metrics by Java Tracing Agent. Default: true
   */
  readonly jmxFetchEnabled?: Boolean | undefined

  /**
   * The logging configuration for Datadog container.
   */
  readonly logging?: ecs.LogDriver | undefined;
}

export class DatadogSidecar extends cdk.Construct implements cdk.ITaggable {

  /**
   * Creates a DataDog sidecar to an existing task definition.
   */
  public static addToTaskDefinition(taskDefinition: TaskDefinition, props: DataDogIntegrationProps): cdk.Construct {
    return new DatadogSidecar(taskDefinition.stack, "DataDogSideCar", taskDefinition, props);
  }

  tags: cdk.TagManager;
  private taskDefinition: ecs.TaskDefinition;
  private props: DataDogIntegrationProps

  constructor(scope: cdk.Construct, id: string, taskDefinition: TaskDefinition, props: DataDogIntegrationProps) {
    super(scope, id);
    this.taskDefinition = taskDefinition;
    this.props = props;

    // https://play-with-cdk.com?s=ed63e7f28e4101404cd917241159b8d5
    this.tags = new cdk.TagManager(cdk.TagType.KEY_VALUE, 'myresourceTypeName'); // TODO: Allow custom tags as well (as 3rd parameter)
  }

  /**
   * The resources of this Constructs are rendered here, as environment variables of ContainerDefinition can only be set in constructor,
   * but tags can beapplied later. So this is a safe place to render all needed resources with all .
   */
  prepare() {

    let apmEnabled = (this.props.apmEnabled === undefined) ? true : this.props.apmEnabled;
    let jmxFetchEnabled = (this.props.jmxFetchEnabled === undefined) ? true : this.props.jmxFetchEnabled;
    let datadogSite = (this.props.datadogSite === undefined) ? DataDogSite.us : this.props.datadogSite;
    let datadogTags = this.tags.renderTags().map((tag: any)  => {
      return '"' + tag.Key + ":" + tag.Value + '"'
    });

    // { [key: string]: string; }
    let env = {
      // ...this.tags.renderTags(), // TODO: Format must be DD_TAGS: x.y Validate through tests!
      ECS_FARGATE: 'true',
      DD_APM_ENABLED: apmEnabled.toString(),
      DD_JMXFETCH_ENABLED: jmxFetchEnabled.toString(),
      DD_SITE: datadogSite.toString(),
    };

    if (datadogTags.length > 0) {
      (env as any)['DD_DOGSTATSD_TAGS'] = "[" + datadogTags.toString() + "]"
    }

    const appContainer = this.taskDefinition.defaultContainer;

    const datadog = this.taskDefinition.addContainer('dd-agent', {
      image: ecs.ContainerImage.fromRegistry('datadog/docker-dd-agent'),
      cpu: 64,
      memoryLimitMiB: 128,
      environment: env,
      secrets: {
        DD_API_KEY: this.props.datadogApiKey
      },
      essential: false,
    });

    if (appContainer !== undefined) {
      appContainer.addContainerDependencies(
        {
          container: datadog,
          condition: ecs.ContainerDependencyCondition.SUCCESS
        }
      )
    }

    datadog.addPortMappings({
      containerPort: 8126,
      protocol: ecs.Protocol.TCP,
    });
    datadog.addPortMappings({
      containerPort: 8125,
      protocol: ecs.Protocol.TCP,
    });
  }
}
