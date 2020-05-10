import * as codebuild from '@aws-cdk/aws-codebuild';
import * as amplify from '@aws-cdk/aws-amplify';
import * as cdk from '@aws-cdk/core';
import { setupAppsync } from '../appsync/appsync';

export const setupAmplify = (app: cdk.Construct, id: string) => {
  const api = setupAppsync(app, id)
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
              `export GRAPHQL_URL=${api.graphQlUrl}`,
              `export AUTH_KEY=${api.apiKey}`,
              'yarn',
            ]
          },
          build: {
            commands: [
              'echo $GRAPHQL_URL',
              'echo $AUTH_KEY',
              'yarn build',
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

