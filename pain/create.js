'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async event => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  try {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        //TODO: change to use logged in userid
        userid: data.userid,
        entryid: uuid.v4(),
        level: data.level,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    const entry = await dynamodb.put(params).promise();
    console.log('Success');
    console.log(entry);

    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (err) {
    console.error(`Failure: ${err.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error occurred while creating pain entry.',
      }),
    };
  }
};
