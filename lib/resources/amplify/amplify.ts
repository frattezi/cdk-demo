import * as codebuild from '@aws-cdk/aws-codebuild';
import * as amplify from '@aws-cdk/aws-amplify';
import * as cdk from '@aws-cdk/core';

export const setupAmplify = (app: cdk.Construct, id: string) => {
  const amplifyApp = new amplify.App(app, 'Amplify', {
    sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
      owner: 'frattezi',
      repository: 'user-demo',
      // TODO: Use cdk.SecretValue Api
      oauthToken: cdk.SecretValue.plainText(process?.env?.GITHUB_TOKEN || '')
    }),
    buildSpec: codebuild.BuildSpec.fromObject({ // Alternatively add a `amplify.yml` to the repo
      version: '1.0',
      frontend: {
        phases: {
          preBuild: {
            commands: [
              'yarn'
            ]
          },
          build: {
            commands: [
              'yarn build'
            ]
          }
        },
        artifacts: {
          baseDirectory: 'dist',
          files: '**/*'
        }
      }
    })
  });
  const master = amplifyApp.addBranch('master', { autoBuild: true });
  master.addEnvironment('STAGE', 'prod');
}

