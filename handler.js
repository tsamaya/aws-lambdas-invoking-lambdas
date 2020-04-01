const { hello, helloHTTP } = require('./lib/handlers/hello');
const { quick } = require('./lib/handlers/quick');

module.exports.hello = hello;

module.exports.helloHTTP = helloHTTP;

module.exports.quick = quick;
