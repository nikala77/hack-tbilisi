var _      = require('lodash');
var moment = require('moment');

// TODO: test it
module.exports = {
    isDate: function(val) {
        return val && moment(val).isValid();
    },
    isEmptyOrStringOrArray: function(val) {
        return !val || _.isString(val) || _.isArray(val);
    },
    isStringOrArray: function(val) {
        return _.isString(val) || _.isArray(val);
    },
    isEmptyString: function(val) {
        return !val || !_.isString(val) || val.length === 0;
    },
    isValidObjectId: function(objectId) {
        return /^[0-9a-fA-F]{24}$/.test(objectId);
    },
    isValidEmail: function(email) {
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regex.test(email);
    }
};
