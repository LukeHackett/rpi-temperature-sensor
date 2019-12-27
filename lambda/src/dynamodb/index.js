
const DocumentClient = require('./client');

module.exports.scanTable = async (params) => {
    let results = [];
    let items;

    do {
        items = await DocumentClient.scan(params).promise();
        items.Items.forEach((item) => results.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");

    return results;
};

module.exports.query = async (params) => {
    let results = [];
    let items;

    do {
        items = await DocumentClient.query(params).promise();
        items.Items.forEach((item) => results.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");

    return results;
};