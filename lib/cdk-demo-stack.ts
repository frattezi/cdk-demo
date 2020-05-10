import * as cdk from '@aws-cdk/core';
import { setupAmplify } from './resources/amplify/amplify';
import { setupAppsync } from './resources/appsync/appsync';

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    setupAmplify(this, id)
    setupAppsync(this, id)
  }
}
