const debug = require('debug')('awsl2l');
const { hello, helloHTTP } = require('./lib/handlers/hello');
const { quick } = require('./lib/handlers/quick');
const { invokeSynchronously } = require('./lib/handlers/synchronously');

module.exports.hello = hello;

module.exports.helloHTTP = helloHTTP;

module.exports.quick = quick;

module.exports.invokeSynchronously = invokeSynchronously;

module.exports.syncFunc = async (event) => {
  debug('here');
  return {
    message: 'Your Sync function executed successfully!',
    event,
  };
};

module.exports.asyncFunc = async (event) => {
  return {
    message: 'Your Async function executed successfully!',
    event,
  };
};
