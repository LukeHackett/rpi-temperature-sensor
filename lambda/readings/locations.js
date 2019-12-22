'use strict';

const DynamoDb = require('./model/dynamodb');

const get_response = (status, body) => {
    return {
        statusCode: status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
}

module.exports.handler = (event, context, callback) => {
    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        ScanIndexForward: true,
        Limit: 10
    };
    
    // perform a scan, adding support for pagination

    // response     [ "a", "b", "c" ]

    
    DynamoDb.scan(params, (error, data) => {
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

        console.log(data)

        // create a response
        return callback(null, get_response(201, data));
    });
};

