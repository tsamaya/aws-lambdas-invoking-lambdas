# aws-lambdas-invoking-lambdas

## Requirements

- node >= 12
- AWS account (for deployment)
- yarn or npm

## Quick Start

- clone this repository
- `$ cd path/to/cloned/repo/`
- `$ yarn`

## AWS Credentials

For deployment, an AWS account is needed. The AWS Lambda free usage tier includes 1M free requests per month and 400,000 GB-seconds of compute time per month. Check AWS lambda [pricing]().

Please have a look at that video on [setting up credentials](https://www.youtube.com/watch?v=KngM5bfpttA)

Set up the credentials on your development machine:

I use `awscli` with profile per AWS account
On macOS `$ brew install awscli`

```
$ aws configure --profile your-profile-name
AWS Access Key ID [None]: XXXXXXXXXXXXXXXXXXXX
AWS Secret Access Key [None]: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Default region name [None]: eu-west-2
Default output format [None]: json
```

All good, now lets go deeper

## Guide

### invoke local

This will invoke the lambda function without HTTP transport ie no API Gateway.

```
$ npx serverless invoke local --function hello --data '{"name": "tsamaya"}'
{
    "id": "dde20c20-1bbd-4007-a94d-3c94a1556008",
    "message": "Go Serverless v1.0! Your function executed successfully!",
    "event": {
        "name": "tsamaya"
    }
}
```

### offline mode

Let's start the serverless offline

```
$ yarn start
yarn run v1.22.0
$ serverless offline start
offline: Starting Offline: dev/eu-west-2.
offline: Offline [http for lambda] listening on http://localhost:3002

   ┌─────────────────────────────────────────────────────────────────────────────┐
   │                                                                             │
   │   GET | http://localhost:3000/dev/hello                                     │
   │   POST | http://localhost:3000/2015-03-31/functions/helloHTTP/invocations   │
   │                                                                             │
   └─────────────────────────────────────────────────────────────────────────────┘

offline: [HTTP] server ready: http://localhost:3000 🚀
offline:
offline: Enter "rp" to replay the last request
```

open your browser with http://localhost:3000/dev/hello or `$ curl http://localhost:3000/dev/hello`

```
{
  "id": "5c9e5968-513d-4bc9-8a2c-766a775b0e3c",
  "message": "Go Serverless v1.0! Your function executed successfully!",
  "input": {
    "body": null,
    "headers": {
      "Host": "localhost:3000",
      "User-Agent": "curl/7.64.1",
      "Accept": "*/*"
    },
    "httpMethod": "GET",
    "isBase64Encoded": false,
    "multiValueHeaders": {
      "Host": [
        "localhost:3000"
      ],
      "User-Agent": [
        "curl/7.64.1"
      ],
      "Accept": [
        "*/*"
      ]
    },
    "multiValueQueryStringParameters": null,
    "path": "/hello",
    "pathParameters": null,
    "queryStringParameters": null,
    "requestContext": {
      "accountId": "offlineContext_accountId",
      "apiId": "offlineContext_apiId",
      "authorizer": {
        "principalId": "offlineContext_authorizer_principalId"
      },
      "domainName": "offlineContext_domainName",
      "domainPrefix": "offlineContext_domainPrefix",
      "extendedRequestId": "ck8h1iepf0003y3vv2o00bjus",
      "httpMethod": "GET",
      "identity": {
        "accessKey": null,
        "accountId": "offlineContext_accountId",
        "apiKey": "offlineContext_apiKey",
        "caller": "offlineContext_caller",
        "cognitoAuthenticationProvider": "offlineContext_cognitoAuthenticationProvider",
        "cognitoAuthenticationType": "offlineContext_cognitoAuthenticationType",
        "cognitoIdentityId": "offlineContext_cognitoIdentityId",
        "cognitoIdentityPoolId": "offlineContext_cognitoIdentityPoolId",
        "principalOrgId": null,
        "sourceIp": "127.0.0.1",
        "user": "offlineContext_user",
        "userAgent": "curl/7.64.1",
        "userArn": "offlineContext_userArn"
      },
      "path": "/dev/hello",
      "protocol": "HTTP/1.1",
      "requestId": "ck8h1iepf0004y3vv2xdugj4z",
      "requestTime": "01/Apr/2020:10:00:04 +0200",
      "requestTimeEpoch": 1585728004082,
      "resourceId": "offlineContext_resourceId",
      "resourcePath": "/hello",
      "stage": "dev"
    },
    "resource": "/hello",
    "stageVariables": null
  }
}
```

### deploy

1. create a .env file with the AWS_REGION_DEV, AWS_REGION_INT, or AWS_REGION_PROD regarding the branch you need to deploy; and the AWS_PROFILE you want to use

2. run the deploy.sh script:

```bash
$ ./deploy.sh
Setup
--Prepare environement
--Prepare stage
--AWS credentials
AWS_PROFILE is set to 'tsamaya'
--Prepare dependencies
yarn install v1.22.0
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.28s.
--Prepare environment
AWS_REGION_DEV is unset
➜  aws-lambdas-invoking-lambdas git:(develop) ✗ ./deploy.sh
Setup
--Prepare environement
--Prepare stage
--AWS credentials
AWS_PROFILE is set to 'tsamaya'
--Prepare dependencies
yarn install v1.22.0
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.28s.
--Prepare environment
AWS_REGION_DEV is set to 'eu-west-2'
Deploying from branch develop to stage dev in region eu-west-2
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-lambdas-invoking-lambdas.zip file to S3 (184.29 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.............................................
Serverless: Stack update finished...
Service Information
service: aws-lambdas-invoking-lambdas
stage: dev
region: eu-west-2
stack: aws-lambdas-invoking-lambdas-dev
resources: 16
api keys:
  None
endpoints:
  GET - https://268u5rbjad.execute-api.eu-west-2.amazonaws.com/dev/hello
functions:
  helloHTTP: aws-lambdas-invoking-lambdas-dev-helloHTTP
  hello: aws-lambdas-invoking-lambdas-dev-hello
layers:
  None
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```

## License

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.
