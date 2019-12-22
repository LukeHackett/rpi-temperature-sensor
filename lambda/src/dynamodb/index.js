
const DocumentClient = require('./client');

module.exports.scanTable = async (params) => {
    let scanResults = [];
    let items;

    do {
        items = await DocumentClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while(typeof items.LastEvaluatedKey != "undefined");

    return scanResults;
};
