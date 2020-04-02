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
    //      StatusCode — (Integer) The HTTP status code is in the 200 range for a successful request. For the RequestResponse invocation type, this status code is 200. For the Event invocation type, this status code is 202. For the DryRun invocation type, the status code is 204.
    //      FunctionError — (String) If present, indicates that an error occurred during function execution. Details about the error are included in the response payload.
    //      LogResult — (String) The last 4 KB of the execution log, which is base64 encoded.
    //      Payload — (Buffer(Node.js), Typed Array(Browser)) The response from the function, or an error object.
    //      ExecutedVersion — (String) The version of the function that executed. When you invoke a function with an alias, this indicates which version the alias resolved to.
    //
    // if (!response.Payload) {
    //   debug('    doRequest ends without a Payload');
    //   return {};
    // }
    debug('    doRequest ends with', response);
    return response.Payload;
  } catch (error) {
    debug('    doRequest failed with', error);
    return {};
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
