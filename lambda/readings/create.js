'use strict';

const DynamoDb = require('./model/dynamodb');
const {ReadingSchema} = require('./model/schema');

const epoch = () => {
    return Math.floor(Date.now() / 1000);
}

const get_response = (status, body) => {
    return {
        statusCode: status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
}

module.exports.handler = (event, context, callback) => {
    const reading = JSON.parse(event.body);
    
    // Validate the incoming parameters
    const [error] = ReadingSchema.validate(reading)
    if (error) {
        const response = get_response(400, {
            status: 400,
            timestamp: epoch(),
            message: error.message
        });

        return callback(null, response);
    }

    // Write the values into dynamo db
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            location: reading.location,
            timestamp: reading.timestamp,
            celsius: reading.temperature.celsius,
            kelvin: reading.temperature.kelvin,
            fahrenheit: reading.temperature.fahrenheit
        }
    };

    // write the todo to the database
    DynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
            const status = error.statusCode || 501;
            const response = get_response(status, {
                status: status,
                timestamp: epoch(),
                message: 'Unable to save the reading: ' + error.message,
            });

            return callback(null, response);
        }

        // create a response
        return callback(null, get_response(201, {}));
    });    
};