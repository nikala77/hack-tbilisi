var _              = require('lodash');
var config         = require('../../config/environment');
var usersSrvc      = require('../services/users');
var resourcesSrvc  = require('../services/resources');
var emails         = require('../util/emails');
var encrypt        = require('../util/encryption');
var httpUtil       = require('../util/httpUtil');
var errorUtil      = require('../util/errorUtil');
var validationUtil = require('../util/validationUtil');

exports.getUsers = function(req, res, next) {
    var usersParams = {
        'siteRoles.site': req.user.currentSite
    };
    
    function validateParams() {
        var allowedRoles = ['owner', 'manager', 'admin', 'service provider', 'scheduler', 'api']; // TODO: move to config
        var $in = req.query.in;
        var roles = req.query.roles;
        
        if (_.has(req.query, 'in') && (!_.isArray($in) || !_.all($in, validationUtil.isValidObjectId))) {
            return errorUtil.rejectWithUnprocessableRequestError('in', $in);
        }
        if (_.has(req.query, 'roles') && (!_.isArray(roles) || _.difference(roles, allowedRoles).length > 0)) {
            return errorUtil.rejectWithUnprocessableRequestError('roles', roles);
        }
        return errorUtil.resolve();
    }
    
    function buildQuery() {
        if (req.query.in) {
            usersParams._id = usersParams._id || {};
            usersParams._id.$in = req.query.in;
        }
        if (req.query.roles) {
            usersParams['siteRoles.roles'] = {
                $in: req.query.roles
            };
        }
    }
    
    function getResources() {
        if (req.query.notLinkedToResources) {
            var resourcesParams = {
                site: req.user.currentSite,
                practitioner: {
                    $exists: true,
                    $ne: null
                }
            };
            return resourcesSrvc
                .getResources(resourcesParams, 'practitioner')
                .then(function(resources) {
                    var linkedUsers = _.map(resources, function(resource) {
                        return resource.practitioner.toString();
                    });
                    usersParams._id = usersParams._id || {};
                    usersParams._id.$nin = linkedUsers;
                });
        }
        return [];
    }
    
    validateParams()
        .then(buildQuery)
        .then(getResources)
        .then(function() {
            if (usersParams._id && usersParams._id.$in && usersParams._id.$nin) {
                usersParams._id.$nin = _.difference(usersParams._id.$nin, usersParams._id.$in);
                delete usersParams._id.$in;
            }
            return usersSrvc.getUsers(usersParams, '_id displayName firstName lastName email pic siteRoles.roles'); // TODO: is valid?
        })
        .then(function(users) {
            res.send(users);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.getUserById = function(req, res, next) {
    var params = {
        _id: req.params._id,
        'siteRoles.site': req.user.currentSite
    };
    
    function validate() {
        if (!validationUtil.isValidObjectId(params._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', params._id);
        }
        return errorUtil.resolve();
    }
    
    validate()
        .then(function() {
            return usersSrvc.getUser(params);
        })
        .then(function(user) {
            if (!user) {
                return errorUtil.rejectWithObjectNotFoundError('user');
            }
            res.send(_loadUserRoles(user));
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.deleteUser = function(req, res, next) {
    var params = {
        _id: req.params._id,
        'siteRoles.site': req.user.currentSite
    };
    
    return usersSrvc
        .getUser(params)
        .then(usersSrvc.deleteUser)
        .then(function(user) {
            res.send(user);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.registerOwner = function(req, res, next) {
    var ownerData = req.body;
    ownerData.baseUrl = config.host;
    
    // TODO: validations?
    // TODO: check for duplicates email?
    
    var allowedFields = ['firstName', 'lastName', 'siteName', 'displayName', 'email', 'password', 'baseUrl'];
    var sanitizedOwner = _.pick(ownerData, allowedFields);
    
    return usersSrvc
        .registerOwner(sanitizedOwner)
        .then(function(user) {
            return res.send(user);
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

exports.createUser = function(req, res, next) {
    var userData;
    var userSiteRoles;
    
    function parseParams() {
        var allowedFields = ['email', 'firstName', 'lastName', 'siteName', 'displayName', 'password', 'linkedResource'];
        userData = _.pick(req.body, allowedFields);
        userData.currentSite = req.user.currentSite;
        userData.baseUrl = config.host;
        userSiteRoles = req.body.roles;
        return errorUtil.resolve();
    }
    
    function validate() {
        var allowedRoles = ['owner', 'manager', 'admin', 'service provider', 'scheduler', 'api']; // TODO: move to config
        if (!validationUtil.isValidEmail(userData.email)) {
            return errorUtil.rejectWithUnprocessableRequestError('email', userData.email);
        }
        if (!_.isArray(userSiteRoles) || userSiteRoles.length === 0 || _.difference(userSiteRoles, allowedRoles).length > 0) {
            return errorUtil.rejectWithUnprocessableRequestError('roles', userSiteRoles);
        }
        if (userData.linkedResource && !validationUtil.isValidObjectId(userData.linkedResource)) {
            return errorUtil.rejectWithUnprocessableRequestError('linkedResource', userData.linkedResource);
        }
    }
    
    function sendEmailToNewUser(user) {
        return emails.sendNewUserEmail(user, userData.baseUrl);
    }
    
    parseParams()
        .then(validate)
        .then(function() {
            return _checkEmailUniqueness(userData.email);
        })
        .then(function() {
            return usersSrvc.createUser(userData, userSiteRoles);
        })
        .then(sendEmailToNewUser)
        .then(function() {
            res.status(200).end();
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateUser = function(req, res, next) {
    var isOwnRecord = req.user._id === req.params._id;
    var userData;
    var userSiteRoles;
    var searchQuery;
    
    function parseParams() {
        // TODO: check currentSite
        var allowedFields = ['email', 'firstName', 'lastName', 'displayName', 'currentSite', 'password', 'linkedResource'];
        userData = _.pick(req.body, allowedFields);
        userSiteRoles = req.body.roles;
        searchQuery = {
            _id: req.params._id,
            'siteRoles.site': req.user.currentSite
        };
        return errorUtil.resolve();
    }
    
    function validate() {
        var allowedRoles = ['owner', 'manager', 'admin', 'service provider', 'scheduler', 'api']; // TODO: move to config
        if (!searchQuery._id || !validationUtil.isValidObjectId(searchQuery._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', searchQuery._id);
        }
        if (!validationUtil.isValidEmail(userData.email)) {
            return errorUtil.rejectWithUnprocessableRequestError('email', userData.email);
        }
        if (!_.isArray(userSiteRoles) || userSiteRoles.length === 0 || _.difference(userSiteRoles, allowedRoles).length > 0) {
            return errorUtil.rejectWithUnprocessableRequestError('roles', userSiteRoles);
        }
        if (userData.linkedResource && !validationUtil.isValidObjectId(userData.linkedResource)) {
            return errorUtil.rejectWithUnprocessableRequestError('linkedResource', userData.linkedResource);
        }
    }
    
    // allow changes to own record only unless owner or manager
    function checkEditAllowed(user) {
        if (!isOwnRecord && !req.user.hasRole(['owner', 'manager'])) {
            return errorUtil.rejectWithAccessDeniedError();
        }
        return user;
    }
    
    // allow pw changes to own record only
    function checkPwEditAllowed(user) {
        if (!userData.password) {
            return user;
        }
        if (isOwnRecord) {
            return user;
        }
        if (req.user.hasRole(['owner', 'manager']) && user.hasRole('api')) {
            return user;
        }
        return errorUtil.rejectWithAccessDeniedError();
    }
    
    // ok if not owner in the first place
    // ok if owner before and now
    // check for other owner otherwise
    // don't do resouce changes here
    function checkNotRemovingLastOwner(user) {
        if (user.currentSiteRoles.indexOf('owner') === -1) {
            return user;
        }
        if (user.currentSiteRoles.indexOf('owner') !== -1 && userSiteRoles.indexOf('owner') !== -1) {
            return user;
        }
        
        return usersSrvc
            .getUser({
                'siteRoles.site': user.currentSite,
                _id: {
                    $ne: user._id
                },
                roles: {
                    $nin: ['owner']
                }
            })
            .then(function(otherOwner) {
                if (!otherOwner) {
                    return errorUtil.rejectWithUnprocessableRequestError('Cannot remove owner role as someone has to be the owner!');
                }
                return user;
            });
    }
    
    // changing email requires confirmation email sent before change
    function handleEmailChange(user) {
        if (user.email === userData.email) {
            return user;
        }
        
        if (user.verified) {
            return emails
                .sendEmailChangeEmail(user, userData.email, config.host)
                .then(function() {
                    delete userData.email;
                    return user;
                });
        } else {
            // unverified user changing email 
            // change un to match if not changed too
            if (user.userName !== user.email) {
                user.userName = userData.email;
            }
            return user;
        }
    }
    
    function handlePasswordChange(user) {
        if (userData.password) {
            userData.salt = encrypt.createSalt();
            /* jshint camelcase: false */
            userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
            userData.apiKey = encrypt.createApiKey(user.email, userData.password);
            delete userData.password;
        }
        return user;
    }
    
    function doEdits(user) {
        _.extend(user, userData);
        return user;
    }
    
    function syncRoles(user) {
        user.syncRoles(userSiteRoles);
        return user;
    }
    
    parseParams()
        .then(validate)
        .then(function() {
            return usersSrvc.getUser(searchQuery);
        })
        .then(function(user) {
            if (!user) {
                return errorUtil.rejectWithObjectNotFoundError('user');
            }
            return user;
        })
        .then(checkEditAllowed)
        .then(checkPwEditAllowed)
        .then(checkNotRemovingLastOwner)
        .then(handleEmailChange)
        .then(handlePasswordChange)
        .then(doEdits)
        .then(syncRoles)
        .then(usersSrvc.updateUser)
        .then(function() {
            res.status(200).end();
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.sendNewUserEmail = function(req, res, next) {
    var params = {
        _id: req.params._id,
        'siteRoles.site': req.user.currentSite
    };
    
    usersSrvc
        .getUser(params)
        .then(function(user) {
            if (!user) {
                return errorUtil.rejectWithObjectNotFoundError('User not found');
            }
            if (user.verified) {
                return errorUtil.rejectWithUnprocessableRequestError('User already verified');
            }
            return emails.sendNewUserEmail(user, config.host);
        })
        .then(function() {
            return res.status(200).end();
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.resendNewOwnerEmail = function(req, res, next) {
    usersSrvc
        .getUser({
            _id: req.params._id
        })
        .then(function(user) {
            if (!user) {
                return errorUtil.rejectWithObjectNotFoundError('User not found');
            }
            if (user.verified) {
                return errorUtil.rejectWithUnprocessableRequestError('User already verified');
            }
            return emails.sendNewOwnerEmail(user, config.host);
        })
        .then(function() {
            return res.status(200).end();
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.setPassword = function(req, res, next) {
    // allow for i) no pw set yet, ii) recent pw reset token processed
    var userId = req.params._id;
    
    return usersSrvc
        .savePwIfRecentTokenOrNoPw(userId, req.body.password)
        .then(function() {
            return res.status(200).end();
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.findUserForPwReset = function(req, res, next) {
    return usersSrvc
        .getUser({
            email: req.query.email
        })
        .then(function(user) {
            if (user) {
                return res.send({
                    displayName: user.displayName
                });
            } else {
                return res.end();
            }
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.generatePwResetToken = function(req, res, next) {
    return usersSrvc
        .getUser({
            email: req.body.email
        })
        .then(function(user) {
            return emails.sendEmailPwReset(user, config.host);
        })
        .then(function() {
            res.status(200).end();
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

function _checkEmailUniqueness(email) {
    return usersSrvc
        .getUserCountWithEmail(email)
        .then(function(cnt) {
            if (cnt > 0) {
                return errorUtil.rejectWithDuplicateObjectError('Email is not unique');
            }
        });
}

function _loadUserRoles(user) {
    var roles = user.currentSiteRoles;
    var userObj = user.toObject();
    delete userObj.siteRoles;
    userObj.roles = roles;
    return userObj;
}
