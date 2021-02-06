# CDK-DataDog

An CDK library to easily integrate your applications with DataDog.

![](https://github.com/pgarbe/cdk-datadog/workflows/Build/badge.svg)

> Disclaimer: This is not an offical DataDog Construct Library.

Currently supported:

- DataDog Agent as ECS Sidecar

## How to use it

#### DataDog Agent as SideCar

```typescript
  let existingTaskDefinition = ... // Taskdefinition with app container
  let datadogApiKey = // Secret from ParameterStore or SecretsManager

  DataDogSideCar.addToTaskDefinition(
    taskDefinition,
    {
      datadogApiKey
    }
  );

```

## How it works

Primitives:

- Metric
- Log
- Trace

Manipulate with tags:
https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/

- service
- env
- version

### Fargate

- Logs: fluentbit
- Metrics: dd-agent
- Traces: dd-agent

### Lambda

- Wait for March
