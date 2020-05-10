import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { PolicyStatement } from "@aws-cdk/aws-iam"
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as sns from '@aws-cdk/aws-sns';

import { DynamoEventSource, SqsDlq } from '@aws-cdk/aws-lambda-event-sources';
import * as path from 'path'

export const setupNotificationLambda = (app: cdk.Construct, table: dynamodb.Table) => {
  const notificationTopic = new sns.Topic(app, 'SNSLambda');
  const deadLetterQueue = new sqs.Queue(app, 'deadLetterQueue');

  const lambdaPolicy = new PolicyStatement()
  lambdaPolicy.addActions("sns:Publish")
  lambdaPolicy.addResources(notificationTopic.topicArn)

  const notificationFunction = new lambda.Function(app, 'Lambda', {
    code: lambda.Code.fromAsset(path.join(__dirname, 'notificationLambda')),
    handler: 'lambda_function.lambda_handler',
    runtime: lambda.Runtime.PYTHON_3_6,
    initialPolicy: [lambdaPolicy],
    deadLetterQueue,
  });

  notificationFunction.addEnvironment('TOPIC_ARN', notificationTopic.topicArn)

  notificationFunction.addEventSource(new DynamoEventSource(table, {
    startingPosition: lambda.StartingPosition.TRIM_HORIZON,
    batchSize: 1,
    bisectBatchOnError: true,
    onFailure: new SqsDlq(deadLetterQueue),
    retryAttempts: 2
  }));

}