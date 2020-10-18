#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';
import config from '../config';

const app = new cdk.App();
new CdkStack(app, `${config.stage}-CdkStack`, { env: config.env });
