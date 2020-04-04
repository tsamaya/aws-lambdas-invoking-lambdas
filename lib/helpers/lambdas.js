const debug = require('debug')('awsl2l');

module.exports.buildSuccessResponse = (data) => ({
  statusCode: 200,
  body: JSON.stringify(data, null, 2),
});

module.exports.buildErrorResponse = (code, error) => {
  debug('error with code', code, 'and error', error);
  const response = {
    statusCode: code || 500,
    body: JSON.stringify(error, null, 2),
  };
  return response;
};
