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
