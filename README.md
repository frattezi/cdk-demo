# CDK TypeScript Demo

This is project with study purposes, fell free to comment and use it in your own test cases! 

Uses TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Please follow the [AWS CDK Instructions](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-typescript.html) and setup 
your local environmeant with a valid AWS credential and account.

## Useful commands

 * `yarn build`     Build project
 * `yarn test`      Run tests within this app
 * `yarn deploy`    Build and deploy your services
 * `cdk synth`      Generates Cloudformation files


 ## Infraestructure

 When you run `yarn deploy` the app will deploy the following services with the described vinculations:
 
 ![Infra](https://github.com/frattezi/cdk-demo/blob/master/docs/images/infra_description.png) 

 ---

 ### Amplify

 Amplify is used just to create a simple frontend linked with our `Appsync API`.
 In this example I'm using [a personal React demo](https://github.com/frattezi/user-demo) that can
 communicate with the API using Amplify's interface. 
 **TODO: Some configs need to be updated at user-demo so this actually works**

---

### AppSync

Describes a simple API  for the following entity:

```gql
type User {
    id: String!
    name: String!
    password: String!
}
```

And the following endpoints:

```gql
type Mutation {
    addUser(user: SaveUserInput!): User 
    deleteUser(id: String!): User
}

type Query {
    getUser(id: String!): User
    getUsers: [User]
}
```

The data is persisted at DynamoDB table.

---

### DynamoDB

DynamoDB with Dynamo Streams on. For each data modified it will trigger a lambda with a event and context to be processed.

The Table is a simple table that stores `User`'s

### Lambda

Triggered by DynamoDB it will send multiple messages in a `SNS` topic and it also has a 
`SQS DLQ` in case of failures.

### SNS and SQS

As noted, they're both binded to the `Lambda` service, you can set the `SNS` to deliver a email
for you and test the whole process!