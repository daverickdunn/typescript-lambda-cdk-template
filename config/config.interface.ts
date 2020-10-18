import * as cdk from '@aws-cdk/core';
import * as aws from 'aws-sdk';

export interface Config {
    stage: string
    env: Required<cdk.Environment>
    sns: { 
        EpochTopic: Partial<aws.SNS.PublishInput>
    }
}