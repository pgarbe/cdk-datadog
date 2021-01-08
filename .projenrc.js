const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: '@pgarbe/cdk-datadog',
  description: 'An CDK Construct to for all DataDog users.',
  authorName: 'Philipp Garbe',
  authorUrl: 'https://garbe.io',
  repository: 'https://github.com/pgarbe/cdk-datadog.git',
  keywords: ['cdk', 'datadog', 'ecr', 'lambda'],

  catalog: {
    twitter: 'pgarbe',
  },

  // creates PRs for projen upgrades
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',

  cdkVersion: '1.83.0',
  cdkDependencies: [
    '@aws-cdk/aws-cloudformation',
    '@aws-cdk/aws-codebuild',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/aws-ecr',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-ssm',
    '@aws-cdk/core',
    '@aws-cdk/custom-resources',
  ],
  devDeps: ['pre-commit'],
});

project.gitignore.exclude('cdk.out');
project.npmignore.exclude('examples');
project.synth();
