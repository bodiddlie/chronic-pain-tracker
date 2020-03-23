'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.get = async event => {
  try {
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

    const entry = await dynamodb.get(params).promise();
    console.log('Success');
    console.log(entry);

    return {
      statusCode: 200,
      body: JSON.stringify(entry),
    };
  } catch (err) {
    console.error(`Failure: ${err.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error occurred while retrieving pain entry with id: ${entryid}`,
      }),
    };
  }
};
