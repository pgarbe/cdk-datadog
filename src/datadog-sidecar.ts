// import * as cdk from 'aws-cdk-lib';
// import * as ecs from 'aws-cdk-lib/aws-ecs';
// import { Construct } from 'constructs';
// import * as dd from './';

// // declare module 'aws-cdk-lib/aws-ecs' {
// // interface TaskDefinition {
// //   withDataDogSidecar(this: TaskDefinition, props: DataDogIntegrationProps): void;
// // }
// // }

// // TaskDefinition.prototype.withDataDogSidecar = function withDataDogSidecar(this: TaskDefinition, props: DataDogIntegrationProps) {
// //   new DataDogSideCar((this as any), 'DataDogAgent', this, props);
// // }


// export interface DataDogSideCarProps {
//   /**
//    * The secret that stores the Datadog API key.
//    */
//   readonly datadogApiKey: ecs.Secret;

//   /**
//    * Destination site for your metrics, traces, and logs. Default: DataDogSite.us
//    */
//   readonly datadogSite?: dd.DataDogSite | undefined;

//   /**
//    * Enable trace collection with the Trace Agent. Default: true
//    */
//   readonly apmEnabled?: Boolean | undefined;

//   /**
//    * Enable collection of JMX metrics by Java Tracing Agent. Default: true
//    */
//   readonly jmxFetchEnabled?: Boolean | undefined;

//   /**
//    * The logging configuration for Datadog container.
//    */
//   readonly logging?: ecs.LogDriver | undefined;
// }

// export class DataDogSidecar extends Construct implements cdk.ITaggable {

//   /**
//    * Creates a DataDog sidecar to an existing task definition.
//    */
//   public static addToTaskDefinition(taskDefinition: ecs.TaskDefinition, props: DataDogSideCarProps): Construct {
//     return new DataDogSidecar(taskDefinition.stack, 'DataDogSideCar', taskDefinition, props);
//   }

//   public readonly tags: cdk.TagManager;
//   private taskDefinition: ecs.TaskDefinition;
//   private props: DataDogSideCarProps

//   constructor(scope: Construct, id: string, taskDefinition: ecs.TaskDefinition, props: DataDogSideCarProps) {
//     super(scope, id);

//     this.taskDefinition = taskDefinition;
//     this.props = props;

//     // https://play-with-cdk.com?s=ed63e7f28e4101404cd917241159b8d5
//     this.tags = new cdk.TagManager(cdk.TagType.KEY_VALUE, 'myresourceTypeName');
//   }

//   /**
//    * The resources of this Constructs are rendered here, as environment variables of ContainerDefinition can only be set in constructor,
//    * but tags can beapplied later. So this is a safe place to render all needed resources with all .
//    */
//   protected prepare() {

//     let apmEnabled = (this.props.apmEnabled === undefined) ? true : this.props.apmEnabled;
//     let jmxFetchEnabled = (this.props.jmxFetchEnabled === undefined) ? true : this.props.jmxFetchEnabled;
//     let datadogSite = (this.props.datadogSite === undefined) ? dd.DataDogSite.EU : this.props.datadogSite;

//     let datadogStatsDTags = this.tags.renderTags().map((tag: any) => {
//       return '"' + tag.Key + ':' + tag.Value + '"';
//     });
//     let datadogTags = this.tags.renderTags().map((tag: any) => {
//       return `${tag.Key}:${tag.Value}`;
//     });
//     datadogTags.push(`account_id:${cdk.Stack.of(this).account}`);

//     let env = {
//       ECS_FARGATE: this.taskDefinition.compatibility === ecs.Compatibility.FARGATE ? 'true' : 'false',
//       DD_APM_ENABLED: apmEnabled.toString(),
//       DD_JMXFETCH_ENABLED: jmxFetchEnabled.toString(),
//       DD_SITE: datadogSite.toString(),
//     };

//     if (datadogStatsDTags.length > 0) {
//       (env as any).DD_DOGSTATSD_TAGS = '[' + datadogStatsDTags.toString() + ']';
//     }
//     if (datadogTags.length > 0) {
//       (env as any).DD_TAGS = datadogTags.join(' ');
//     }

//     const appContainer = this.taskDefinition.defaultContainer;

//     const datadog = this.taskDefinition.addContainer('dd-agent', {
//       image: ecs.ContainerImage.fromRegistry('public.ecr.aws/datadog/agent:7-jmx'),
//       cpu: 64,
//       memoryLimitMiB: 128,
//       environment: env,
//       secrets: {
//         DD_API_KEY: this.props.datadogApiKey,
//       },
//       essential: false,
//     });

//     if (appContainer !== undefined) {
//       appContainer.addContainerDependencies(
//         {
//           container: datadog,
//           condition: ecs.ContainerDependencyCondition.SUCCESS,
//         },
//       );
//     }

//     datadog.addPortMappings({
//       containerPort: 8126,
//       protocol: ecs.Protocol.TCP,
//     });
//     datadog.addPortMappings({
//       containerPort: 8125,
//       protocol: ecs.Protocol.TCP,
//     });
//   }
// }
