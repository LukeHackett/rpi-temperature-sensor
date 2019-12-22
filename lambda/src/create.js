'use strict';

const DynamoDb = require('./dynamodb/client');
const HttpUtils = require('./utils/http');
const {ReadingSchema} = require('./model/schema');

module.exports.handler = (event, context, callback) => {
    const reading = JSON.parse(event.body);
    
    // Validate the incoming parameters
    const [error] = ReadingSchema.validate(reading)
    if (error) {
        return callback(null, HttpUtils.badRequest(error.message));
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
            const status = error.statusCode || 500;
            const message = 'Unable to save the reading: ' + error.message;

            return callback(null, HttpUtils.error(status, message));
        }

        // create a response
        return callback(null, HttpUtils.created(params.Item));
    });    
};