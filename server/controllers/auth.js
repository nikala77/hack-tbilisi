var _          = require('lodash');
var jwt        = require('jwt-simple');
var moment     = require('moment');
var Promise    = require('bluebird');
var config     = require('../../config/environment');
var httpUtil   = require('../util/httpUtil');
var errorUtil  = require('../util/errorUtil');
var usersSrvc  = require('../services/users');
var encryption = require('../util/encryption');

exports.ensureAuthenticated = function(req, res, next) {
    var err;
    if (!req.headers.authorization) {
        err = errorUtil.getUnauthorizedError('Request must have Authorization header');
        return httpUtil.processError(err, 'json', res, next);
    }
    try {
        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);
        if (payload.exp <= moment().unix()) {
            err = errorUtil.getUnauthorizedError('Token has expired');
            return httpUtil.processError(err, 'json', res, next);
        }
        req.user = payload.sub;
        req.user.hasRole = function(roles) {
            return checkForRoles(this, roles);
        };
        next();
    } catch(ex) {
        var err = errorUtil.getUnauthorizedError('Token malformed');
        return httpUtil.processError(err, 'json', res, next);
    }
};

exports.ensureAuthenticatedWrapper = function(req, res, next) {
    exports.ensureAuthenticated(req, res, next);
};

exports.refreshJwt = function(req, res) {
    return usersSrvc
        .getUser({
            _id: req.user._id
        })
        .then(function(user) {
            if (!user) {
                return errorUtil.rejectWithObjectNotFoundError('User');
            }
            res.send({
                jwt: createToken(user),
                user: createUser(user)
            });
        });
};

exports.login = function(req, res, next) {
    function validate() {
        return new Promise(function(resolve, reject) {
            if (req.body.apiKey) {
                try {
                    var creds = encryption.decodeApiKey(req.body.apiKey);
                    req.body.email = creds.email;
                    req.body.password = creds.password;
                } catch (err) {
                    return reject(errorUtil.getUnauthorizedError('apiKey malformed'));
                }
            }
            if (!req.body.email || !req.body.password) {
                return reject(errorUtil.getUnauthorizedError('invalid un/pw'));
            }
            resolve();
        });
    }
    
    function validateUser(user) {
        return new Promise(function(resolve, reject) {
            if (!user) {
                return reject(errorUtil.getUnauthorizedError('invalid un/pw'));
            }
            /* jshint camelcase: false */
            if (!user.hashed_pwd) {
                return reject(errorUtil.getUnauthorizedError('no password'));
            }
            if (user.disabled) {
                return reject(errorUtil.getUnauthorizedError('disabled'));
            }
            resolve(user);
        });
    }
    
    function verifyUser(user) {
        return new Promise(function(resolve, reject) {
            if (user.verified) {
                return resolve(user);
            }
            if (user.hasRole('owner')) {
                return reject(errorUtil.getUnauthorizedError('un-verified owner'));
            }
            reject(errorUtil.getUnauthorizedError('un-verified user'));
        });
    }
    
    function authenticateUser(user) {
        return new Promise(function(resolve, reject) {
            if (user.comparePassword(req.body.password)) {
                return resolve(user);
            }
            reject(errorUtil.getUnauthorizedError('invalid un/pw'));
        });
    }

    var _user;
    return validate()
        .then(function() {
            return usersSrvc.getFullUser({ email: req.body.email.toLowerCase() });
        })
        .then(function(user) {
            _user = user;
            return user;
        })
        .then(validateUser)
        .then(verifyUser)
        .then(authenticateUser)
        .then(function(user) {
            res.send({
                jwt: createToken(user),
                user: createUser(user)
            });
        })
        .catch(function(err) {
            if (errorUtil.isUnauthorizedError(err)) {
                err.info = {
                    status: err.message,
                    userId: _user ? _user.id : '',
                    displayName: _user ? _user.displayName : '',
                    email: _user ? _user.email : ''
                };
            }
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.requireRoles = function(roles) {
    return function(req, res, next) {
        exports.ensureAuthenticated(req, res, function() {
            if (!req.user || !req.user.roles || !checkForRoles(req.user, roles)) {
                var err = errorUtil.getAccessDeniedError();
                return httpUtil.processError(err, null, res, next);
            }
            next();
        });
    };
};

exports.requireRolesWrapper = function(roles) {
    return exports.requireRoles(roles);
};

function checkForRoles(user, roles) {
    if (_.isString(roles)) {
        roles = [roles];
    }
    return _.intersection(user.roles, roles).length > 0;
}

function createToken(user) {
    var payload = {
        sub: {
            _id: user._id,
            roles: user.currentSiteRoles,
            currentSite: user.currentSite
        },
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}

function createUser(user) {
    // detect highter priority role
    var currentRoles = user.currentSiteRoles;
    var index = 0;
    var priority = 0;
    var sortedRoles = { 'owner': 5, 'service provider': 4, 'manager': 3,
                        'admin': 2, 'scheduler': 1 };

    currentRoles.forEach(function(role, ind) {
        if(sortedRoles[role] > priority) {
            index = ind;
            priority = sortedRoles[role];
        }
    });

    return {
        _id: user._id.toString(),
        displayName: user.displayName ? user.displayName : user.email,
        pic: user.pic,
        verified: user.verified,
        roles: user.currentSiteRoles,
        activeRole: user.currentSiteRoles[index],
        currentSite: user.currentSite,
        jwtExpiry: moment().add(14, 'days')
    };
}
