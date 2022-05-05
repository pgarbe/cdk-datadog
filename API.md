# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DataDogSidecar <a name="DataDogSidecar" id="@pgarbe/cdk-datadog.DataDogSidecar"></a>

- *Implements:* aws-cdk-lib.ITaggable

#### Initializers <a name="Initializers" id="@pgarbe/cdk-datadog.DataDogSidecar.Initializer"></a>

```typescript
import { DataDogSidecar } from '@pgarbe/cdk-datadog'

new DataDogSidecar(scope: Construct, id: string, taskDefinition: TaskDefinition, props: DataDogSideCarProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.taskDefinition">taskDefinition</a></code> | <code>aws-cdk-lib.aws_ecs.TaskDefinition</code> | *No description.* |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.props">props</a></code> | <code><a href="#@pgarbe/cdk-datadog.DataDogSideCarProps">DataDogSideCarProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.id"></a>

- *Type:* string

---

##### `taskDefinition`<sup>Required</sup> <a name="taskDefinition" id="@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.taskDefinition"></a>

- *Type:* aws-cdk-lib.aws_ecs.TaskDefinition

---

##### `props`<sup>Required</sup> <a name="props" id="@pgarbe/cdk-datadog.DataDogSidecar.Initializer.parameter.props"></a>

- *Type:* <a href="#@pgarbe/cdk-datadog.DataDogSideCarProps">DataDogSideCarProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pgarbe/cdk-datadog.DataDogSidecar.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.addToTaskDefinition">addToTaskDefinition</a></code> | Creates a DataDog sidecar to an existing task definition. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@pgarbe/cdk-datadog.DataDogSidecar.isConstruct"></a>

```typescript
import { DataDogSidecar } from '@pgarbe/cdk-datadog'

DataDogSidecar.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@pgarbe/cdk-datadog.DataDogSidecar.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `addToTaskDefinition` <a name="addToTaskDefinition" id="@pgarbe/cdk-datadog.DataDogSidecar.addToTaskDefinition"></a>

```typescript
import { DataDogSidecar } from '@pgarbe/cdk-datadog'

DataDogSidecar.addToTaskDefinition(taskDefinition: TaskDefinition, props: DataDogSideCarProps)
```

Creates a DataDog sidecar to an existing task definition.

###### `taskDefinition`<sup>Required</sup> <a name="taskDefinition" id="@pgarbe/cdk-datadog.DataDogSidecar.addToTaskDefinition.parameter.taskDefinition"></a>

- *Type:* aws-cdk-lib.aws_ecs.TaskDefinition

---

###### `props`<sup>Required</sup> <a name="props" id="@pgarbe/cdk-datadog.DataDogSidecar.addToTaskDefinition.parameter.props"></a>

- *Type:* <a href="#@pgarbe/cdk-datadog.DataDogSideCarProps">DataDogSideCarProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSidecar.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | TagManager to set, remove and format tags. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pgarbe/cdk-datadog.DataDogSidecar.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@pgarbe/cdk-datadog.DataDogSidecar.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

TagManager to set, remove and format tags.

---


## Structs <a name="Structs" id="Structs"></a>

### DataDogCredentials <a name="DataDogCredentials" id="@pgarbe/cdk-datadog.DataDogCredentials"></a>

#### Initializer <a name="Initializer" id="@pgarbe/cdk-datadog.DataDogCredentials.Initializer"></a>

```typescript
import { DataDogCredentials } from '@pgarbe/cdk-datadog'

const dataDogCredentials: DataDogCredentials = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogCredentials.property.datadogApiKey">datadogApiKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pgarbe/cdk-datadog.DataDogCredentials.property.datadogAppKey">datadogAppKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pgarbe/cdk-datadog.DataDogCredentials.property.datadogSite">datadogSite</a></code> | <code><a href="#@pgarbe/cdk-datadog.DataDogSite">DataDogSite</a></code> | *No description.* |

---

##### `datadogApiKey`<sup>Optional</sup> <a name="datadogApiKey" id="@pgarbe/cdk-datadog.DataDogCredentials.property.datadogApiKey"></a>

```typescript
public readonly datadogApiKey: string;
```

- *Type:* string

---

##### `datadogAppKey`<sup>Optional</sup> <a name="datadogAppKey" id="@pgarbe/cdk-datadog.DataDogCredentials.property.datadogAppKey"></a>

```typescript
public readonly datadogAppKey: string;
```

- *Type:* string

---

##### `datadogSite`<sup>Optional</sup> <a name="datadogSite" id="@pgarbe/cdk-datadog.DataDogCredentials.property.datadogSite"></a>

```typescript
public readonly datadogSite: DataDogSite;
```

- *Type:* <a href="#@pgarbe/cdk-datadog.DataDogSite">DataDogSite</a>

---

### DataDogLambdaAspectProps <a name="DataDogLambdaAspectProps" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps"></a>

#### Initializer <a name="Initializer" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps.Initializer"></a>

```typescript
import { DataDogLambdaAspectProps } from '@pgarbe/cdk-datadog'

const dataDogLambdaAspectProps: DataDogLambdaAspectProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.dataDogApiKey">dataDogApiKey</a></code> | <code>string \| aws-cdk-lib.aws_ssm.IStringParameter</code> | Defines the DataDog API Key. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.datadogSite">datadogSite</a></code> | <code><a href="#@pgarbe/cdk-datadog.DataDogSite">DataDogSite</a></code> | Destination site for your metrics, traces, and logs. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.logsInjection">logsInjection</a></code> | <code>boolean</code> | Inject Datadog trace id into logs for correlation. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.nodeVersion">nodeVersion</a></code> | <code>string</code> | Version of DataDog extension layer for Node runtime. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.pythonVersion">pythonVersion</a></code> | <code>string</code> | Version of DataDog extension layer for Python runtime. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.tracing">tracing</a></code> | <code>boolean</code> | Initialize the Datadog tracer when set to true. |

---

##### `dataDogApiKey`<sup>Required</sup> <a name="dataDogApiKey" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.dataDogApiKey"></a>

```typescript
public readonly dataDogApiKey: string | IStringParameter;
```

- *Type:* string | aws-cdk-lib.aws_ssm.IStringParameter

Defines the DataDog API Key.

A string will be mapped to DD_API_KEY env variable in plain-text (NOT recommended)
An SSM StringParamter (optional secure) is mapped to either DD_API_KEY_SECRET_ARN or DD_API_KEY_SSM_NAME.

---

##### `datadogSite`<sup>Optional</sup> <a name="datadogSite" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.datadogSite"></a>

```typescript
public readonly datadogSite: DataDogSite;
```

- *Type:* <a href="#@pgarbe/cdk-datadog.DataDogSite">DataDogSite</a>
- *Default:* : DataDogSite.US

Destination site for your metrics, traces, and logs.

---

##### `logsInjection`<sup>Optional</sup> <a name="logsInjection" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.logsInjection"></a>

```typescript
public readonly logsInjection: boolean;
```

- *Type:* boolean
- *Default:* : true

Inject Datadog trace id into logs for correlation.

---

##### `nodeVersion`<sup>Optional</sup> <a name="nodeVersion" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.nodeVersion"></a>

```typescript
public readonly nodeVersion: string;
```

- *Type:* string
- *Default:* : 41

Version of DataDog extension layer for Node runtime.

---

##### `pythonVersion`<sup>Optional</sup> <a name="pythonVersion" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.pythonVersion"></a>

```typescript
public readonly pythonVersion: string;
```

- *Type:* string
- *Default:* : 26

Version of DataDog extension layer for Python runtime.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="@pgarbe/cdk-datadog.DataDogLambdaAspectProps.property.tracing"></a>

```typescript
public readonly tracing: boolean;
```

- *Type:* boolean
- *Default:* : false

Initialize the Datadog tracer when set to true.

---

### DataDogSideCarProps <a name="DataDogSideCarProps" id="@pgarbe/cdk-datadog.DataDogSideCarProps"></a>

#### Initializer <a name="Initializer" id="@pgarbe/cdk-datadog.DataDogSideCarProps.Initializer"></a>

```typescript
import { DataDogSideCarProps } from '@pgarbe/cdk-datadog'

const dataDogSideCarProps: DataDogSideCarProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSideCarProps.property.datadogApiKey">datadogApiKey</a></code> | <code>aws-cdk-lib.aws_ecs.Secret</code> | The secret that stores the Datadog API key. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSideCarProps.property.apmEnabled">apmEnabled</a></code> | <code>boolean</code> | Enable trace collection with the Trace Agent. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSideCarProps.property.datadogSite">datadogSite</a></code> | <code><a href="#@pgarbe/cdk-datadog.DataDogSite">DataDogSite</a></code> | Destination site for your metrics, traces, and logs. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSideCarProps.property.jmxFetchEnabled">jmxFetchEnabled</a></code> | <code>boolean</code> | Enable collection of JMX metrics by Java Tracing Agent. |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSideCarProps.property.logging">logging</a></code> | <code>aws-cdk-lib.aws_ecs.LogDriver</code> | The logging configuration for Datadog container. |

---

##### `datadogApiKey`<sup>Required</sup> <a name="datadogApiKey" id="@pgarbe/cdk-datadog.DataDogSideCarProps.property.datadogApiKey"></a>

```typescript
public readonly datadogApiKey: Secret;
```

- *Type:* aws-cdk-lib.aws_ecs.Secret

The secret that stores the Datadog API key.

---

##### `apmEnabled`<sup>Optional</sup> <a name="apmEnabled" id="@pgarbe/cdk-datadog.DataDogSideCarProps.property.apmEnabled"></a>

```typescript
public readonly apmEnabled: boolean;
```

- *Type:* boolean

Enable trace collection with the Trace Agent.

Default: true

---

##### `datadogSite`<sup>Optional</sup> <a name="datadogSite" id="@pgarbe/cdk-datadog.DataDogSideCarProps.property.datadogSite"></a>

```typescript
public readonly datadogSite: DataDogSite;
```

- *Type:* <a href="#@pgarbe/cdk-datadog.DataDogSite">DataDogSite</a>

Destination site for your metrics, traces, and logs.

Default: DataDogSite.us

---

##### `jmxFetchEnabled`<sup>Optional</sup> <a name="jmxFetchEnabled" id="@pgarbe/cdk-datadog.DataDogSideCarProps.property.jmxFetchEnabled"></a>

```typescript
public readonly jmxFetchEnabled: boolean;
```

- *Type:* boolean

Enable collection of JMX metrics by Java Tracing Agent.

Default: true

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@pgarbe/cdk-datadog.DataDogSideCarProps.property.logging"></a>

```typescript
public readonly logging: LogDriver;
```

- *Type:* aws-cdk-lib.aws_ecs.LogDriver

The logging configuration for Datadog container.

---

## Classes <a name="Classes" id="Classes"></a>

### DataDogLambda <a name="DataDogLambda" id="@pgarbe/cdk-datadog.DataDogLambda"></a>

- *Implements:* aws-cdk-lib.IAspect

Adds DataDog layer to supported lambda functions.

#### Initializers <a name="Initializers" id="@pgarbe/cdk-datadog.DataDogLambda.Initializer"></a>

```typescript
import { DataDogLambda } from '@pgarbe/cdk-datadog'

new DataDogLambda(props: DataDogLambdaAspectProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambda.Initializer.parameter.props">props</a></code> | <code><a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps">DataDogLambdaAspectProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@pgarbe/cdk-datadog.DataDogLambda.Initializer.parameter.props"></a>

- *Type:* <a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps">DataDogLambdaAspectProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambda.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="@pgarbe/cdk-datadog.DataDogLambda.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="@pgarbe/cdk-datadog.DataDogLambda.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogLambda.extendFuntions">extendFuntions</a></code> | Adds DataDog layer to supported lambda functions. |

---

##### `extendFuntions` <a name="extendFuntions" id="@pgarbe/cdk-datadog.DataDogLambda.extendFuntions"></a>

```typescript
import { DataDogLambda } from '@pgarbe/cdk-datadog'

DataDogLambda.extendFuntions(scope: Construct, props: DataDogLambdaAspectProps)
```

Adds DataDog layer to supported lambda functions.

###### `scope`<sup>Required</sup> <a name="scope" id="@pgarbe/cdk-datadog.DataDogLambda.extendFuntions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `props`<sup>Required</sup> <a name="props" id="@pgarbe/cdk-datadog.DataDogLambda.extendFuntions.parameter.props"></a>

- *Type:* <a href="#@pgarbe/cdk-datadog.DataDogLambdaAspectProps">DataDogLambdaAspectProps</a>

---




## Enums <a name="Enums" id="Enums"></a>

### DataDogSite <a name="DataDogSite" id="@pgarbe/cdk-datadog.DataDogSite"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSite.EU">EU</a></code> | *No description.* |
| <code><a href="#@pgarbe/cdk-datadog.DataDogSite.US">US</a></code> | *No description.* |

---

##### `EU` <a name="EU" id="@pgarbe/cdk-datadog.DataDogSite.EU"></a>

---


##### `US` <a name="US" id="@pgarbe/cdk-datadog.DataDogSite.US"></a>

---

