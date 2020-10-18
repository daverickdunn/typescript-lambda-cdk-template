import * as cdk from '@aws-cdk/core';
import { Config } from './config.interface';

function dynamicConfig(stage: string, env: Required<cdk.Environment>): Config {
    return {
        stage,
        env,
        sns: {
            EpochTopic: {
                TopicArn: `arn:aws:sns:${env.region}:${env.account}:${stage}-EpochTopic`
            }
        }
    };
};

const stage = process.env.NODE_ENV;
const region = process.env.AWS_REGION;
const account = process.env.AWS_ACCOUNT_ID;

if (!stage) throw new Error('NODE_ENV must be set');
if (!region) throw new Error('AWS_REGION must be set');
if (!account) throw new Error('AWS_ACCOUNT_ID must be set');

// differentiate deployments/stages by defining:
// - stage
// - env.region
// - env.account

const config = dynamicConfig(stage, { region, account });

export default config;
