/* eslint-disable no-console */
const { Lambda } = require('aws-sdk');

const options = {
  apiVersion: '2015-03-31',
};
const lambda = new Lambda(options);

const { credentials } = lambda.config;

if (!credentials) {
  console.error('AWS Credentials are missing. Provide one of these options:');
  console.error('- AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
  console.error('- AWS_PROFILE');
  console.error('- set a default profile');
  process.exit(1);
}
