import * as sns from '@aws-cdk/aws-sns';
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const queue = new sqs.Queue(this, 'CdkQueue', {
            visibilityTimeout: cdk.Duration.seconds(300),
        });

        const topic = new sns.Topic(this, 'CdkTopic');

        const transform_fn = new lambda.Function(this, 'CdkLambda', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('dist'),
            handler: 'transform.handler',
            environment: {
                NODE_ENV: process.env.NODE_ENV!,
                AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID!,
            },
        });

        transform_fn.addEventSource(new SqsEventSource(queue));

        topic.grantPublish(transform_fn);
    }
}
