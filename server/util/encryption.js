var crypto  = require('crypto');
var jwt     = require('jwt-simple');
var moment  = require('moment');
var XXHash  = require('xxhash');
var Promise = require('bluebird');
var config  = require('../../config/environment');

// TODO: test it
exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
};

// TODO: test it
exports.hashPwd = function(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};

// TODO: test it
exports.hashEmail = function(email) {
    var emailParts = email.split('@');
    var name = hashWord(emailParts[0]);
    var domainParts = emailParts[1].split('.');
    var domainName = hashWord(domainParts[0]);
    var result = name + '@' + domainName;
    for (var i = 1; i < domainParts.length; i++) {
        result += '.' + domainParts[i];
    }
    return result;

    function hashWord(word) {
        var result = '';
        if (word.length < 3) {
            return word;
        }
        for (var i = 0; i < word.length; i++) {
            if (i < 2) {
                result += word.charAt(i);
            } else {
                result += '*';
            }
        }
        return result;
    }
};

// TODO: test it
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

// TODO: test it
exports.decodeApiKey = function(apiKey) {
    var payload = jwt.decode(apiKey, config.TOKEN_SECRET);
    return payload.sub;
};

// TODO: test it
exports.createObjectHash = function(object, fields) {
    if (object._doc) {
        object=object._doc;
    }
    var keys = Object.keys(object);
    var sanitized = {};
    fields.forEach(function(field) {
        if (keys.indexOf(field) !== -1) {
            if ((typeof(object[field]) !== 'string') || object[field].trim() !== '') {
                if (field === 'clients' || field === 'resources') {
                    sanitized[field] = removeNonIdSubFields(object[field]);
                } else {
                    sanitized[field] = object[field];
                }
            }
        }
    });

    var allFields = JSON.stringify(sanitized);
    var hash = createHash(allFields);
    // console.log('allFields: ' + allFields);
    // console.log('hash: ' + hash);
    return hash;

    function removeNonIdSubFields(object) {
        if (typeof(object) !== 'object') {
            return object;
        }
        var result;
        if (Object.prototype.toString.call(object) !== '[object Array]') {
            result = removeNonIdFields(object);
        } else {
            result=[];
            object.forEach(function(subObject) {
                result.push( removeNonIdFields(subObject));
            });
        }
        return result;

        function removeNonIdFields(object) {
            var keys = Object.keys(object);
            if (keys.indexOf('_doc') > -1) {
                return object._id.toString();
            }
            return object;
        }
    }
};

// TODO: test it
var createHash = exports.createHash = function(field) {
    var buffer = new Buffer(field);
    var hash = XXHash.hash(buffer, 0xCAFEBABE);
    return hash;
};

// TODO: test it
exports.createHashedObject = function(object, fields) {
    return new Promise(function(resolve) {
        var hashedDocument = {};
        fields.forEach(function(field) {
            if (object[field]) {
                hashedDocument[field] = createHash(object[field]);
            }
        });
        resolve(hashedDocument);
    });
};
