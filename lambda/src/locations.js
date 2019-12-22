'use strict';

const DynamoDb = require('./dynamodb');
const HttpUtils = require('./utils/http');

module.exports.handler = async (event, context, callback) => {
    // DynamoDb Scan Query
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Limit: 10
    };

    // Perform a scan of the table
    const data = await DynamoDb.scanTable(params);

    // Obtain all unique location names
    const items = data.map(r => r.location);
    const locations = Array.from(new Set(items));

    return HttpUtils.ok({ locations });
};
