const { v4: uuidv4 } = require('uuid');

module.exports.hello = async (event) => {
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  return {
    id: uuidv4(),
    message: 'Go Serverless v1.0! Your function executed successfully!',
    event,
  };
};

module.exports.helloHTTP = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        id: uuidv4(),
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
