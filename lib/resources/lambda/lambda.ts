import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import { DynamoEventSource, SqsDlq } from '@aws-cdk/aws-lambda-event-sources';
import * as path from 'path'

export const setupNotificationLambda = (app: cdk.Construct, table: dynamodb.Table) => {
  const notificationFunction = new lambda.Function(app, 'Lambda', {
    code: lambda.Code.fromAsset(path.join(__dirname, 'notificationLambda')),
    handler: 'lambda_function.lambda_handler',
    runtime: lambda.Runtime.PYTHON_3_6,
  });

  const deadLetterQueue = new sqs.Queue(app, 'deadLetterQueue');

  notificationFunction.addEventSource(new DynamoEventSource(table, {
    startingPosition: lambda.StartingPosition.TRIM_HORIZON,
    batchSize: 1,
    bisectBatchOnError: true,
    onFailure: new SqsDlq(deadLetterQueue),
    retryAttempts: 2
  }));

}