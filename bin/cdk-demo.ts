#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkDemoStack } from '../lib/cdk-demo-stack';

const app = new cdk.App();
new CdkDemoStack(app, 'CdkUserDemo');

// Using custom config
// new CdkDemoStack(app, 'CdkDemoStack', { env: { account: 'DEFAULT', region: 'us-east-1' } });