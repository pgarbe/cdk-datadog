# CDK-DataDog

An CDK library to easily integrate your applications with DataDog.

Supports
* DataDog Agent as ECS Sidecar
* DataDog Monitors as native CDK Constructs

## How to use it

#### DataDog Agent as SideCar

```typescript
  let existingTaskDefinition = ... // Taskdefinition with app container
  let datadogApiKey = // Secret from ParameterStore or SecretsManager

  new DatadogSidecar(stack, 'DatadogSidecar', existingTaskDefinition, { 
    datadogApiKey: datadogApiKey,
  });

```

## Open Issues
- [ ] Deployment pipeline (GitHub actions?)
- [ ] feat: enable CloudFormation 3rd party resources 
- [ ] feat: account integration (+ role)
- [ ] Real integration test or at least simple example
- [ ] feat: datadog monitors
- [ ] feat: datadog synthetic tests
- [ ] feat: datadog dashboards
- [ ] feat: datadog log forwarder (aspect?)
- [ ] feat: create monitors for all relevant resources (like cdk-watchful)

https://github.com/aws/aws-cdk/blob/master/packages/@aws-cdk/custom-resources/README.md
