const debug = require('debug')('awsl2l');
const { Lambda } = require('aws-sdk');
const {
  buildSuccessResponse,
  buildErrorResponse,
} = require('../helpers/lambdas.js');
const { NODE_ENV, AWS_REGION } = require('../config');

const options = {
  apiVersion: '2015-03-31',
  region: AWS_REGION,
};
if (NODE_ENV === 'development') {
  options.endpoint = 'http://localhost:3002';
}
const lambda = new Lambda(options);

const doRequest = async (x, y) => {
  debug('    doRequest begins');
  //   return new Promise((resolve, reject) => {
  debug('      input params', x, y);
  const input = { x, y };

  const params = {
    FunctionName: 'aws-lambdas-invoking-lambdas-dev-syncFunc',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(input),
  };
  debug('      invoke λ(syncFunc) with options', options, 'and params', params);
  try {
    const response = await lambda.invoke(params).promise();
    debug('    doRequest ends with', response);
    return response;
  } catch (error) {
    debug('    doRequest failed with', error);
    return {};
  }
  // , (error, data) => {
  //   if (error) {
  //     debug('      failed', error);
  //     reject(error);
  //   } else {
  //     debug('      returns', data);
  //     resolve(data);
  //   }
  // });
  //   });
};

module.exports.invokeSynchronously = async (event) => {
  debug('function `invokeSynchronously` begins');
  const { x, y } = event.pathParameters;
  try {
    const data = await doRequest(x, y);
    const response = buildSuccessResponse(data);
    debug('function `invokeSynchronously` ends with success');
    return response;
  } catch (error) {
    debug('function `invokeSynchronously` ends with error');
    return buildErrorResponse(500, error);
  }
};
