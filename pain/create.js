const uuid = require('uuid');
const dynamodb = require('../libs/dynamo-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.create = async event => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      //TODO: change to use logged in userid
      userid: data.userid,
      entryid: uuid.v4(),
      painLevel: data.painLevel,
      note: data.note,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await dynamodb.call('put', params);
    console.log('Success');
    return success(params.Item);
  } catch (err) {
    console.error(`Failure: ${err.message}`);
    return failure({ message: 'Error occurred while creating pain entry.' });
  }
};
