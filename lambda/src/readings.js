'use strict';

const DynamoDb = require('./dynamodb');
const HttpUtils = require('./utils/http');
const {ReadingsRequestSchema} = require('./validation/schema');

module.exports.handler = async ({pathParameters, queryStringParameters}, context, callback) => {
    // Setup a request object
    const request = {
        location: pathParameters && pathParameters.location,
        from: queryStringParameters && parseInt(queryStringParameters.from || 0),
        to: queryStringParameters && parseInt(queryStringParameters.to || 0) 
    };

    // Validate the incoming parameters
    const [error] = ReadingsRequestSchema.validate(request)
    if (error) {
        return HttpUtils.badRequest(error.message);
    }

    // DynamoDb Query
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: '#location = :location and #timestamp BETWEEN :from and :to',
        ExpressionAttributeNames: {
            "#location": "location",
            "#timestamp": "timestamp"
        },
        ExpressionAttributeValues: {
            ":location": request.location,
            ":from": request.from,
            ":to": request.to
        },
        ScanIndexForward: true
    };

    // Perform a query of the table
    const data = await DynamoDb.query(params);

    // Sort the data into chronological order
    return HttpUtils.ok(
        data.sort((a,b) => a.timestamp - b.timestamp)
    );
};

