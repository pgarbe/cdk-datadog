# CDK-DataDog

An CDK library to easily integrate your applications with DataDog.

![](https://github.com/pgarbe/cdk-datadog/workflows/Build/badge.svg)

> Disclaimer: This is not an offical DataDog Construct Library. 

Currently supported:
* DataDog Agent as ECS Sidecar
* DataDog Monitors as native CDK Constructs


## How to use it

#### DataDog Agent as SideCar

```typescript
  let existingTaskDefinition = ... // Taskdefinition with app container
  let datadogApiKey = // Secret from ParameterStore or SecretsManager

  DatadogSidecar.addToTaskDefinition(
    taskDefinition, 
    {
      datadogApiKey: secret
    }
  );

```

## Open Issues
- [ ] feat: datadog monitors
- [ ] feat: enable CloudFormation 3rd party resources 
- [ ] feat: account integration (+ role)
- [ ] Real integration test or at least simple example
- [ ] feat: datadog synthetic tests
- [ ] feat: datadog dashboards
- [ ] feat: datadog log forwarder (aspect?)
- [ ] feat: create monitors for all relevant resources (like cdk-watchful)
- [ ] feat: support additional languages (python, dotnet, ...)
- [ ] feat: forward (selected) events from EventBridge (e.g. ECS events)

https://github.com/aws/aws-cdk/blob/master/packages/@aws-cdk/custom-resources/README.md
