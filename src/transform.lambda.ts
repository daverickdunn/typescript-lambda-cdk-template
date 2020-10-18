import * as aws from 'aws-sdk';
import { Context, SQSEvent } from 'aws-lambda';
import config from '../config';

interface EpochMessage {
    epoch: number
}

exports.handler = async function (event: SQSEvent, context: Context) {

    let sns = new aws.SNS({ region: config.env.region })

    for (const record of event.Records) {

        //  do some task
        let message: EpochMessage = JSON.parse(record.body);
        let transformed = (new Date(message.epoch)).toISOString();
        let Message = JSON.stringify({
            epoch: message.epoch,
            iso: transformed
        })

        // publish to SNS
        await sns.publish({
            ...config.sns.EpochTopic, // contains TopicArn
            Message
        })

    }

    return { statusCode: 200 };
};
