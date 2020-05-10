import * as cdk from '@aws-cdk/core';
import { setupAmplify } from './resources/amplify/amplify';


export class CdkDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    setupAmplify(this, id)
  }
}
