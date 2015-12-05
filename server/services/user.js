var encrypt  =  require('../util/encryption');
var Q 		 =  require('q');
var mongoose =  require('mongoose');
var moment   =  require('moment');
var User     =  mongoose.model('User');

exports.createUser = function(userData) {
    return User.findOne({
        email: userData.email
    })
    .then(function(newUser) {
    	if(newUser) {
    		var deferred = Q.defer();
    		deferred.reject('User with this email already exists!');
    		return deferred.promise;
    	}
        userData.salt = encrypt.createSalt();
        userData.hashedPwd = encrypt.hashPwd(userData.salt, userData.password);
        userData.apiKey = encrypt.createApiKey(userData.email, userData.password);
        
        return new User(userData).save();
    });
};

exports.compareCredentials = function(apiKey, email, password) {
    var creds = encrypt.decodeApiKey(apiKey);

    if(email === creds.email && password === creds.password) {
        return true;
    }

    return false;
};

exports.isExpired = function(expireTime) {
    if(expireTime <= moment().unix()) {
        return true;
    } else {
        return false;
    }
};