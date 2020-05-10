import json
import boto3
def lambda_handler(event, context):
    print(event)
    print(context)
    client = boto3.client('sns')
    response = client.publish(
        TopicArn='string',
        Message='string',
        MessageStructure='string',
)



