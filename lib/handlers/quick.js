const debug = require('debug')('awsl2λ');

const {
  buildSuccessResponse,
  buildErrorResponse,
} = require('../helpers/lambdas.js');

const fetchData = (id) => {
  // Faking an async call to the database
  return new Promise((resolve) => {
    debug('    fetching data...');
    setTimeout(() => {
      debug('    ...data fetched');
      resolve({
        id,
        name: 'github',
        description: 'amazing code platform',
        url: 'https://github.com',
      });
    }, 600);
  });
};

module.exports.quick = async (event) => {
  debug('function `quick` begins');
  const { id } = event.pathParameters;
  try {
    const data = await fetchData(id);
    const response = buildSuccessResponse(data);
    debug('function `quick` ends with success');
    return response;
  } catch (error) {
    debug('function `quick` ends with error');
    return buildErrorResponse(500, error);
  }
};
