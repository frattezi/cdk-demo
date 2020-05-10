import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

import { join } from 'path'
import { MappingTemplate, PrimaryKey, Values } from '@aws-cdk/aws-appsync';
import { setupNotificationLambda } from '../lambda/lambda';

export const setupAppsync = (app: cdk.Construct, id: string) => {
  const api = new appsync.GraphQLApi(app, `Api`, {
    name: `userDemoApi`,
    authorizationConfig: {
      defaultAuthorization: {
        apiKeyDesc: 'DemoKey',
      },
    },
    schemaDefinitionFile: join(__dirname, 'schema.graphql'),
  });

  // DynamoDB setup
  const usersTable = new dynamodb.Table(app, `UsersTable`, {
    partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
  });

  const userDS = api.addDynamoDbDataSource('User', 'The user data source', usersTable);

  userDS.createResolver({
    typeName: 'Query',
    fieldName: 'getUser',
    requestMappingTemplate: MappingTemplate.dynamoDbGetItem('id', 'id'),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
  });

  userDS.createResolver({
    typeName: 'Query',
    fieldName: 'getUsers',
    requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
  });

  userDS.createResolver({
    typeName: 'Mutation',
    fieldName: 'addUser',
    requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
      PrimaryKey.partition('id').auto(),
      Values.projecting('user')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
  });

  userDS.createResolver({
    typeName: 'Mutation',
    fieldName: 'deleteUser',
    requestMappingTemplate: MappingTemplate.dynamoDbDeleteItem('id', 'id'),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
  });

  api.addDynamoDbDataSource(`Dynamo`, 'Database for UserDemo', usersTable)

  // Lambda Setup
  setupNotificationLambda(app, usersTable)

  return api
}
