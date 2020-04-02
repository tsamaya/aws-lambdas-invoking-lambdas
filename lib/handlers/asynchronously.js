const debug = require('debug')('awsl2l');
const { Lambda } = require('aws-sdk');
const {
  buildSuccessResponse,
  buildErrorResponse,
} = require('../helpers/lambdas.js');
const { NODE_ENV, AWS_REGION } = require('../config');

// TODO : lambda options in common => config
const options = {
  apiVersion: '2015-03-31',
  region: AWS_REGION,
};
if (NODE_ENV === 'development') {
  // maybe here a envar for the endpoint in case of multiple offline services
  options.endpoint = 'http://localhost:3002';
}
const lambda = new Lambda(options);

const doRequest = async (x, y) => {
  debug('    doRequest begins');
  //   return new Promise((resolve, reject) => {
  debug('      input params', x, y);
  const input = { x, y };

  const params = {
    FunctionName: 'aws-lambdas-invoking-lambdas-dev-asyncFunc',
    InvokeArgs: JSON.stringify(input),
  };
  debug(
    '      invoke λ(asyncFunc) with options',
    options,
    'and params',
    params
  );
  try {
    const response = await lambda.invokeAsync(params).promise();
    debug('    lambda.invoke returns', response);
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#invokeAsync-property
    //
    //
    // data (Object) — the de-serialized data returned from the request. Set to null if a request error occurs. The data object has the following properties:
    //      StatusCode — (Integer) The status code.
    //
    // Offline the status code is in the 200. But the expected this status code is 202 from AWS.
    //
    debug('    doRequest ends with', response);
    return response.Payload;
  } catch (error) {
    debug('    doRequest failed with', error);
    return {}; // TODO
  }
};

module.exports.invokeASynchronously = async (event) => {
  debug('function `invokeSynchronously` begins');
  const { x, y } = event.pathParameters;
  try {
    const data = await doRequest(x, y);
    const response = buildSuccessResponse(data);
    debug('function `invokeASynchronously` ends with success');
    return response;
  } catch (error) {
    debug('function `invokeASynchronously` ends with error');
    return buildErrorResponse(500, error);
  }
};
