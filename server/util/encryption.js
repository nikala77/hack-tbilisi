var crypto = require('crypto');
var jwt     = require('jwt-simple');
var moment  = require('moment');
var config  = require('../../config/env');


exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
};

exports.hashPwd = function(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};

exports.createApiKey = function(email, password) {
    var payload = {
        sub: {
            email: email,
            password: password
        },
        iat: moment().unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.decodeApiKey = function(apiKey) {
    var creds = jwt.decode(apiKey, config.TOKEN_SECRET);
    return creds.sub;
};