const TimeUtils = require('./time');

module.exports.ok = (body) => {
    return module.exports.response(200, body);
};

module.exports.created = (body) => {
    return module.exports.response(201, body);
};

module.exports.badRequest = (body) => {
    return module.exports.error(400, body);
};

module.exports.error = (status, message) => {
    return module.exports.response(status, {
        status: status,
        timestamp: TimeUtils.epoch(),
        message: message
    });
};

module.exports.response = (status, body) => {
    return {
        statusCode: status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
};

// TODO - remove
module.exports.get_response = (status, body) => {
    return module.exports.response(status, body);
};
