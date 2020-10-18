# Simple TypeScript Lambda Application with AWS CDK

## Requirements

You must set the following environment variables:
- `NODE_ENV`: can be whatever string you like
- `AWS_REGION`: target region
- `AWS_ACCOUNT_ID`: target account

While it is possible to get the `AWS_XXX` values at runtime, or by injecting them from the CDK to handlers as environment variables, providing them directly allows the `config` to be more canonical and the rest of the codebase much more declarative. An improvement could certainly be added to have webpack find these values via the aws cli.

## Structure

Lambda functions must be located at the top leve of the `/src` directory and their filename must end with `.lambda.ts`.

## Steps to Reproduce

Obviously you can just use this template to start a new project, but for learning purposes these are the steps I took to create it. Other than the actual code contained within the files mentioned, no steps were omitted.

- `cdk init sample-app --language typescript`
- `npm install -D @aws-cdk/aws-lambda @aws-cdk/aws-lambda-event-sources @types/aws-lambda webpack webpack-cli ts-loader rimraf`
- move all cdk `dependencies` to `devDependencies`
- `npm install aws-sdk aws-lambda`
- create directories:
  - `config`
  - `src/lambda`
- create files:
  - `webpack.config.ts`
  - `config/index.ts`
  - `config/interface.ts`
  - `src/lambda/transform.handler.ts`
- added the following scripts to `package.json`
    - `"deploy": "npm run build && cdk deploy"`
    - `"deploy-staging": "set NODE_ENV=staging&& npm run deploy"`
    - `"deploy-production": "set NODE_ENV=production&& npm run deploy"`
- modify `bin/cdk.ts` to import environment settings from `config.env`
- modify `bin/cdk.ts` to prefix stack name using `config.stage`
- modify `lib/cdk-stack.ts` add lambda construct and set existing queue as source
- modify `lib/cdk-stack.ts` remove sns subscription and grant lambda publish permissions