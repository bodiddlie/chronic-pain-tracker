const dynamodb = require('../libs/dynamo');
const { success, failure } = require('../libs/response');

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
    ConditionExpression: 'userid = :userid and entryid = :entryid',
    ExpressionAttributeValues: {
      ':userid': userid,
      ':entryid': entryid,
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
