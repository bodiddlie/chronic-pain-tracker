const dynamodb = require('../libs/dynamo');
const { success, failure } = require('../libs/response');

module.exports.get = async event => {
  //TODO: change to use logged in user
  const userid = 'testuser';
  const { entryid } = event.pathParameters;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userid,
      entryid,
    },
  };

  try {
    const result = await dynamodb.call('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, message: 'Item not found.' });
    }
  } catch (err) {
    console.error(`Failure: ${err.message}`);
    return failure({
      message: `Error occurred while retrieving pain entry with id: ${entryid}`,
    });
  }
};
