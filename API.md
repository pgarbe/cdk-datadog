# API Reference

**Classes**

Name|Description
----|-----------
[DataDogLambda](#pgarbe-cdk-datadog-datadoglambda)|Adds DataDog layer to supported lambda functions.
[DataDogSidecar](#pgarbe-cdk-datadog-datadogsidecar)|*No description*


**Structs**

Name|Description
----|-----------
[DataDogCredentials](#pgarbe-cdk-datadog-datadogcredentials)|*No description*
[DataDogLambdaAspectProps](#pgarbe-cdk-datadog-datadoglambdaaspectprops)|*No description*
[DataDogSideCarProps](#pgarbe-cdk-datadog-datadogsidecarprops)|*No description*


**Enums**

Name|Description
----|-----------
[DataDogSite](#pgarbe-cdk-datadog-datadogsite)|*No description*



## class DataDogLambda  <a id="pgarbe-cdk-datadog-datadoglambda"></a>

Adds DataDog layer to supported lambda functions.

__Implements__: [IAspect](#aws-cdk-core-iaspect)

### Initializer


Adds DataDog extension to lambda functions.

Only Python (2.7, 3.6, 3.7 and 3.8) and Node (10.x and 12.x) runtimes are supported.

```ts
new DataDogLambda(props: DataDogLambdaAspectProps)
```

* **props** (<code>[DataDogLambdaAspectProps](#pgarbe-cdk-datadog-datadoglambdaaspectprops)</code>)  *No description*
  * **dataDogApiKey** (<code>string &#124; [IStringParameter](#aws-cdk-aws-ssm-istringparameter)</code>)  Defines the DataDog API Key. 
  * **datadogSite** (<code>[DataDogSite](#pgarbe-cdk-datadog-datadogsite)</code>)  Destination site for your metrics, traces, and logs. __*Default*__: : DataDogSite.US
  * **enhancedMetrics** (<code>boolean</code>)  Generate enhanced Datadog Lambda integration metrics, such as, aws.lambda.enhanced.invocations and aws.lambda.enhanced.errors. __*Default*__: : true
  * **logsInjection** (<code>boolean</code>)  Inject Datadog trace id into logs for correlation. __*Default*__: : true
  * **nodeVersion** (<code>string</code>)  Version of DataDog extension layer for Node runtime. __*Default*__: : 41
  * **pythonVersion** (<code>string</code>)  Version of DataDog extension layer for Python runtime. __*Default*__: : 26
  * **tracing** (<code>boolean</code>)  Initialize the Datadog tracer when set to true. __*Default*__: : false


### Methods


#### visit(node) <a id="pgarbe-cdk-datadog-datadoglambda-visit"></a>

All aspects can visit an IConstruct.

```ts
visit(node: IConstruct): void
```

* **node** (<code>[IConstruct](#aws-cdk-core-iconstruct)</code>)  *No description*




#### *static* extendFuntions(scope, props) <a id="pgarbe-cdk-datadog-datadoglambda-extendfuntions"></a>

Adds DataDog layer to supported lambda functions.

```ts
static extendFuntions(scope: Construct, props: DataDogLambdaAspectProps): void
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **props** (<code>[DataDogLambdaAspectProps](#pgarbe-cdk-datadog-datadoglambdaaspectprops)</code>)  *No description*
  * **dataDogApiKey** (<code>string &#124; [IStringParameter](#aws-cdk-aws-ssm-istringparameter)</code>)  Defines the DataDog API Key. 
  * **datadogSite** (<code>[DataDogSite](#pgarbe-cdk-datadog-datadogsite)</code>)  Destination site for your metrics, traces, and logs. __*Default*__: : DataDogSite.US
  * **enhancedMetrics** (<code>boolean</code>)  Generate enhanced Datadog Lambda integration metrics, such as, aws.lambda.enhanced.invocations and aws.lambda.enhanced.errors. __*Default*__: : true
  * **logsInjection** (<code>boolean</code>)  Inject Datadog trace id into logs for correlation. __*Default*__: : true
  * **nodeVersion** (<code>string</code>)  Version of DataDog extension layer for Node runtime. __*Default*__: : 41
  * **pythonVersion** (<code>string</code>)  Version of DataDog extension layer for Python runtime. __*Default*__: : 26
  * **tracing** (<code>boolean</code>)  Initialize the Datadog tracer when set to true. __*Default*__: : false






## class DataDogSidecar  <a id="pgarbe-cdk-datadog-datadogsidecar"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [ITaggable](#aws-cdk-core-itaggable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new DataDogSidecar(scope: Construct, id: string, taskDefinition: TaskDefinition, props: DataDogSideCarProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **taskDefinition** (<code>[TaskDefinition](#aws-cdk-aws-ecs-taskdefinition)</code>)  *No description*
* **props** (<code>[DataDogSideCarProps](#pgarbe-cdk-datadog-datadogsidecarprops)</code>)  *No description*
  * **datadogApiKey** (<code>[Secret](#aws-cdk-aws-ecs-secret)</code>)  The secret that stores the Datadog API key. 
  * **apmEnabled** (<code>boolean</code>)  Enable trace collection with the Trace Agent. __*Optional*__
  * **datadogSite** (<code>[DataDogSite](#pgarbe-cdk-datadog-datadogsite)</code>)  Destination site for your metrics, traces, and logs. __*Optional*__
  * **jmxFetchEnabled** (<code>boolean</code>)  Enable collection of JMX metrics by Java Tracing Agent. __*Optional*__
  * **logging** (<code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code>)  The logging configuration for Datadog container. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**tags** | <code>[TagManager](#aws-cdk-core-tagmanager)</code> | TagManager to set, remove and format tags.

### Methods


#### protected prepare() <a id="pgarbe-cdk-datadog-datadogsidecar-prepare"></a>

The resources of this Constructs are rendered here, as environment variables of ContainerDefinition can only be set in constructor, but tags can beapplied later.

So this is a safe place to render all needed resources with all .

```ts
protected prepare(): void
```





#### *static* addToTaskDefinition(taskDefinition, props) <a id="pgarbe-cdk-datadog-datadogsidecar-addtotaskdefinition"></a>

Creates a DataDog sidecar to an existing task definition.

```ts
static addToTaskDefinition(taskDefinition: TaskDefinition, props: DataDogSideCarProps): Construct
```

* **taskDefinition** (<code>[TaskDefinition](#aws-cdk-aws-ecs-taskdefinition)</code>)  *No description*
* **props** (<code>[DataDogSideCarProps](#pgarbe-cdk-datadog-datadogsidecarprops)</code>)  *No description*
  * **datadogApiKey** (<code>[Secret](#aws-cdk-aws-ecs-secret)</code>)  The secret that stores the Datadog API key. 
  * **apmEnabled** (<code>boolean</code>)  Enable trace collection with the Trace Agent. __*Optional*__
  * **datadogSite** (<code>[DataDogSite](#pgarbe-cdk-datadog-datadogsite)</code>)  Destination site for your metrics, traces, and logs. __*Optional*__
  * **jmxFetchEnabled** (<code>boolean</code>)  Enable collection of JMX metrics by Java Tracing Agent. __*Optional*__
  * **logging** (<code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code>)  The logging configuration for Datadog container. __*Optional*__

__Returns__:
* <code>[Construct](#aws-cdk-core-construct)</code>



## struct DataDogCredentials  <a id="pgarbe-cdk-datadog-datadogcredentials"></a>






Name | Type | Description 
-----|------|-------------
**datadogApiKey**? | <code>string</code> | __*Optional*__
**datadogAppKey**? | <code>string</code> | __*Optional*__
**datadogSite**? | <code>[DataDogSite](#pgarbe-cdk-datadog-datadogsite)</code> | __*Optional*__



## struct DataDogLambdaAspectProps  <a id="pgarbe-cdk-datadog-datadoglambdaaspectprops"></a>






Name | Type | Description 
-----|------|-------------
**dataDogApiKey** | <code>string &#124; [IStringParameter](#aws-cdk-aws-ssm-istringparameter)</code> | Defines the DataDog API Key.
**datadogSite**? | <code>[DataDogSite](#pgarbe-cdk-datadog-datadogsite)</code> | Destination site for your metrics, traces, and logs.<br/>__*Default*__: : DataDogSite.US
**enhancedMetrics**? | <code>boolean</code> | Generate enhanced Datadog Lambda integration metrics, such as, aws.lambda.enhanced.invocations and aws.lambda.enhanced.errors.<br/>__*Default*__: : true
**logsInjection**? | <code>boolean</code> | Inject Datadog trace id into logs for correlation.<br/>__*Default*__: : true
**nodeVersion**? | <code>string</code> | Version of DataDog extension layer for Node runtime.<br/>__*Default*__: : 41
**pythonVersion**? | <code>string</code> | Version of DataDog extension layer for Python runtime.<br/>__*Default*__: : 26
**tracing**? | <code>boolean</code> | Initialize the Datadog tracer when set to true.<br/>__*Default*__: : false



## struct DataDogSideCarProps  <a id="pgarbe-cdk-datadog-datadogsidecarprops"></a>






Name | Type | Description 
-----|------|-------------
**datadogApiKey** | <code>[Secret](#aws-cdk-aws-ecs-secret)</code> | The secret that stores the Datadog API key.
**apmEnabled**? | <code>boolean</code> | Enable trace collection with the Trace Agent.<br/>__*Optional*__
**datadogSite**? | <code>[DataDogSite](#pgarbe-cdk-datadog-datadogsite)</code> | Destination site for your metrics, traces, and logs.<br/>__*Optional*__
**jmxFetchEnabled**? | <code>boolean</code> | Enable collection of JMX metrics by Java Tracing Agent.<br/>__*Optional*__
**logging**? | <code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code> | The logging configuration for Datadog container.<br/>__*Optional*__



## enum DataDogSite  <a id="pgarbe-cdk-datadog-datadogsite"></a>



Name | Description
-----|-----
**EU** |
**US** |


