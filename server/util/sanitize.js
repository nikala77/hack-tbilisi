var Promise = require('bluebird');

// TODO: remove it, use _.extend
exports.sanitizeData = function (data, allowedFields) {
    var sanitized = {};
    var keys = Object.keys(data);
    return new Promise(function (resolve) {
        keys.forEach(function (key) {
            if (allowedFields.indexOf(key) !== -1) {
                sanitized[key] = data[key];
            }
        });
        resolve(sanitized);
    });
};
