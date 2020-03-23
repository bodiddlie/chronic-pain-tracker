'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.list = async event => {
  //TODO: change to use logged in userid
  //const {userid} = event.pathParameters
  const userid = 'testuser';
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: '#userid = :u',
    ExpressionAttributeValues: {
      ':u': userid,
    },
    ExpressionAttributeNames: {
      '#userid': 'userid',
    },
  };

  try {
    const items = await dynamodb.query(params).promise();
    console.log('Success');
    console.log(items);

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (err) {
    console.error(`Failure: ${err.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error occurred while retrieving pain entries for user: ${userid}`,
      }),
    };
  }
};
