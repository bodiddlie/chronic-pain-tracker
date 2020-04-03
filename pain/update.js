const dynamodb = require('../libs/dynamo-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.update = async event => {
  //TODO: change to use logged in user
  const userid = 'testuser';
  const { entryid } = event.pathParameters;
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userid,
      entryid,
    },
    UpdateExpression:
      'SET painLevel = :painLevel, note = :note, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':painLevel': data.painLevel,
      ':note': data.note || '',
      ':updatedAt': timestamp,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamodb.call('update', params);
    return success({});
  } catch (err) {
    console.error(`Failure: ${err.message}`);
    return failure({
      message: `Error updating pain entry with id: ${entryid}`,
    });
  }
};
