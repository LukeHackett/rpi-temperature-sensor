'use strict';

const DynamoDb = require('./model/dynamodb');

module.exports.handler = (event, context, callback) => {
    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: '#location = :location and #ts BETWEEN :start and :end',
        ExpressionAttributeNames:{
            "#location": "location",
            "#ts": "timestamp"
        },
        ExpressionAttributeValues: {
            ":location": "lounge",
            ":start": 2,
            ":end": 4
        },
        ScanIndexForward: true,
        Limit: 10
    };


    // Add support for pagination

    DynamoDb.query(params, (error) => {
        // handle potential errors
        if (error) {
            const status = error.statusCode || 501;
            const response = get_response(status, {
                status: status,
                timestamp: epoch(),
                message: 'Unable to find the readings: ' + error.message,
            });

            return callback(null, response);
        }

        // create a response
        return callback(null, get_response(201, {}));
    });
};

