import * as pj from 'projen';

const project = new pj.awscdk.AwsCdkConstructLibrary({
  name: '@pgarbe/cdk-datadog',
  description: 'An CDK Construct to for all DataDog users.',
  keywords: ['cdk', 'datadog', 'ecr', 'lambda'],

  author: 'Philipp Garbe',
  authorAddress: 'https://garbe.io',

  repositoryUrl: 'https://github.com/pgarbe/cdk-datadog.git',
  defaultReleaseBranch: 'main',

  projenrcTs: true,

  catalog: {
    twitter: 'pgarbe',
  },


  cdkVersion: '2.23.0',
  devDeps: ['pre-commit'],
});

project.npmignore!.exclude('examples');
project.synth();
