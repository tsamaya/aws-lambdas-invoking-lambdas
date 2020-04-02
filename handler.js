const debug = require('debug')('awsl2l');
const { hello, helloHTTP } = require('./lib/handlers/hello');
const { quick } = require('./lib/handlers/quick');
const { invokeSynchronously } = require('./lib/handlers/synchronously');
const { invokeASynchronously } = require('./lib/handlers/asynchronously');

module.exports.hello = hello;

module.exports.helloHTTP = helloHTTP;

module.exports.quick = quick;

module.exports.invokeSynchronously = invokeSynchronously;

module.exports.invokeASynchronously = invokeASynchronously;

module.exports.syncFunc = async (event) => {
  debug('here');
  return {
    message: 'Your Sync function executed successfully!',
    event,
  };
};

module.exports.asyncFunc = async (event) => {
  return new Promise((resolve) => {
    debug('    processing event...');
    setTimeout(() => {
      debug('    ...processing done');
      resolve({
        message: 'Your long processing function executed successfully!',
        event,
      });
    }, 1000 * 60);
  });
};
