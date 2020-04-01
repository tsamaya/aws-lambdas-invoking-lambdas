const debug = require('debug')('awsl2l');

debug('process.env.NODE_ENV', process.env.NODE_ENV);
debug('process.env.AWS_REGION', process.env.AWS_REGION);

module.exports.AWS_REGION = process.env.AWS_REGION;
module.exports.NODE_ENV = process.env.NODE_ENV;
