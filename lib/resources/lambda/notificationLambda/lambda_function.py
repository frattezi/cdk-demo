import json
import boto3
import os
def lambda_handler(event, context):
    print(event)
    print(context)
    client = boto3.client('sns')
    for record in event.get('Records'):
        if record.get('eventName') == 'INSERT':
            print(record)
            response = client.publish(
                TopicArn=os.getenv('TOPIC_ARN'),
                Message='New Account created',
                Subject='New User'
            )
            print(response)



