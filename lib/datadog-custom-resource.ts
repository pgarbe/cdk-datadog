import * as cdk from '@aws-cdk/core';

export interface DataDogAccountIntegrationProps {
}

export class DataDogAccountIntegration extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
  
  //   const supportedResource = [
  //     { 
  //       'TypeName': 'Datadog::Integrations::AWS',
  //       'SchemaHandlerPackage': 's3://datadog-cloudformation-resources/datadog-integrations-aws/datadog-integrations-aws-1.0.1.zip'
  //     },
  //     { 
  //       'TypeName': 'Datadog::Monitors::Monitor',
  //       'SchemaHandlerPackage': 's3://datadog-cloudformation-resources/datadog-monitors-monitor/datadog-monitors-monitor-1.0.1.zip'
  //     },
  //     { 
  //       'TypeName': 'Datadog::Monitors::Downtime',
  //       'SchemaHandlerPackage': 's3://datadog-cloudformation-resources/datadog-monitors-downtime/datadog-monitors-downtime-1.0.1.zip'
  //     },
  //     { 
  //       'TypeName': 'Datadog::IAM::User',
  //       'SchemaHandlerPackage': 's3://datadog-cloudformation-resources/datadog-iam-user/datadog-iam-user-1.0.1.zip'
  //     },
  //   ];
  }

    // TODO: 
    // aws cloudformation register-type \
    //   --type RESOURCE \
    //   --type-name "Datadog::Integrations::AWS" \
    //   --schema-handler-package "s3://datadog-cloudformation-resources/datadog-integrations-aws/datadog-integrations-aws-1.0.1.zip" \
    //   --profile pgarbe

    // Wait for completion and get version from 'TypeVersionArn'
    // aws cloudformation describe-type-registration   --registration-token "3349b1c6-6ef4-47ca-a80b-ec517c995c84" --profile pgarbe

    // Get latest version
    // aws cloudformation list-type-versions \
    //   --type RESOURCE \
    //   --type-name "Datadog::Integrations::AWS" \
    //   --profile pgarbe

    // aws cloudformation set-type-default-version \
    // --region "<REGION>" \
    // --type RESOURCE \
    // --version-id <VERSION_ID> \
    // --type-name "<DATADOG_RESOURCE_NAME>"
}


// aws cloudformation deregister-type \
//   --arn "arn:aws:cloudformation:eu-west-1:424144556073:type/resource/Datadog-Integrations-AWS/00000001" \
//   --profile pgarbe

// aws cloudformation deregister-type \
//   --type "RESOURCE" \
//   --type-name "Datadog::Integrations::AWS" \
//   --version-id "00000003" \
//   --profile pgarbe
