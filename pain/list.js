const dynamodb = require('../libs/dynamo-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.list = async event => {
  //TODO: change to use logged in userid
  const userid = 'testuser';
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'userid = :userid',
    ExpressionAttributeValues: {
      ':userid': userid,
    },
  };

  try {
    const result = await dynamodb.call('query', params);
    console.log('Success');
    return success(result.Items);
  } catch (err) {
    console.error(`Failure: ${err.message}`);
    return failure({
      message: `Error occurred while retrieving pain entries for user ${userid}`,
    });
  }
};
