var async         = require('async');
var Promise       = require('bluebird');
var _             = require('lodash');
var resourcesSrvc = require('../services/resources');
var sitesSrvc     = require('../services/sites');
var tokensSrvc    = require('../services/tokens');
var encrypt       = require('../util/encryption');
var emails        = require('../util/emails');
var User          = require('mongoose').model('user');

// TODO: test it
exports.getUsers = function(params, keys) {
    keys = keys || '_id';
    return User
        .find(params)
        .select(keys)
        .sort('email')
        .execAsync();
};

// TODO: test it
var getUser = exports.getUser = function(params) {
    return User.findOneAsync(params);
};

// TODO: Remove it, use getUser with keys parameter
exports.getFullUser = function(params) {
    return User
        .findOne(params)
        .select('+hashed_pwd +salt')
        .execAsync();
};

// TODO: test it
exports.getUserCountWithEmail = function(email) {
    return User.countAsync({ email: email });
};

// TODO: test it
// TODO: refactor it, move emails logic to users contoller
exports.registerOwner = function(registrationData) {
    //expects baseUrl in newOwnerData
    registrationData.name = registrationData.siteName;
    registrationData.firstName = registrationData.displayName;
    
    var newUser;
    var newSite;
    return disallowExistingOwner(registrationData)
        .then(function() {
            return _createNewUser(registrationData);
        })
        .then(function(user) {
            newUser = user;
            return sitesSrvc.createSite(registrationData, newUser);
        })
        .then(function(site) {
            newSite = site;
            newUser.currentSite = newSite;
            return saveUser(newUser);
        })
        .then(function() {
            return resourcesSrvc.createResource({
                site: newSite,
                name: newUser.displayName,
                practitioner: newUser
            });
        })
        .then(function() {
            return emails.sendNewOwnerEmail(newUser, registrationData.baseUrl);
        })
        .then(function() {
            return newUser;
        });

    function disallowExistingOwner(registrationData) {
        return getUser({
                email: registrationData.email
            })
            .then(function(user) {
                if (!user) {
                    return registrationData;
                }
                // check for owner of some site
                for (var i = 0; i < user.siteRoles.length; i++) {
                    if (user.siteRoles[i].roles.indexOf('owner') !== -1) {
                        throw new Error('Log in and use \'Add Site\' to add a new site');
                    }
                    return registrationData;
                }
            });
    }
};

// TODO: test it
exports.createUser = function(newUserData, userSiteRoles) {
    function extendCurrentSite() {
        return sitesSrvc
            .getSite({
                _id: newUserData.currentSite
            })
            .then(function(site) {
                newUserData.currentSite = site;
                return newUserData;
            });
    }
    
    function addSiteToUser(user) {
        return sitesSrvc
            .addSiteToUser(newUserData.currentSite, user, userSiteRoles)
            .then(function() {
                return user;
            });
    }
    
    function createResourceIfServiceProvider(user) {
        if (_.indexOf(userSiteRoles, 'service provider') !== -1 && !linkedResource) {
            return resourcesSrvc
                .createDefaultResource(user.currentSite, user)
                .then(function() {
                    return user;
                });
        }
        return user;
    }
    
    var linkedResource = newUserData.linkedResource;
    delete newUserData.linkedResource;
    
    return extendCurrentSite()
        .then(function() {
            return _createNewUser(newUserData, userSiteRoles);
        })
        .then(addSiteToUser)
        .then(createResourceIfServiceProvider)
        .then(function(user) {
            if (linkedResource) {
                return _updateLinkedResource(user, linkedResource);
            }
            return user;
        });
};

// TODO: test it
exports.updateUser = function(user) {
    var linkedResource = user.linkedResource;
    delete user.linkedResource;
    
    return user
        .saveAsync()
        .spread(function(user) {
            return user;
        })
        .then(function(user) {
            _updateLinkedResource(user, linkedResource);
        });
};

// TODO: test it
var saveUser = exports.saveUser = function(user) {
    return user
        .saveAsync()
        .spread(function(user) {
            return user;
        });
};

// TODO: test it
exports.deleteUser = function(user) {
    return checkUserNotVerified(user)
        .then(checkUserHasNoTransactions)
        .then(removeUserFromSites)
        .then(removeUserFromResources)
        .then(removeUser);

    function checkUserHasNoTransactions(user) {
        return new Promise(function(resolve) {
            //todo when have financials etc
            resolve(user);
        });
    }

    function checkUserNotVerified(user) {
        return new Promise(function(resolve, reject) {
            if (!user) {
                return reject(new Error('No user to delete'));
            }
            if (user.verified) {
                return reject(new Error('Cannot delete verified user'));
            }
            resolve(user);
        });
    }

    function removeUserFromResources(user) {
        if (!user.resource) {
            return user;
        }
        return resourcesSrvc.getResource({
                // TODO: currentSite?
                _id: user.resource.toString()
            })
            .then(function(resource) {
                if (resource) {
                    resource.pracitioner = undefined;
                    return resourcesSrvc.saveResource(resource)
                        .then(function() {
                            return user;
                        });
                } else {
                    return user;
                }
            });
    }

    function removeUserFromSites(user) {
        return sitesSrvc
            .getSites({
                users: user._id
            })
            .map(function(site) {
                var i = site.users.indexOf(user._id);
                if (i > -1) {
                    site.users.splice(i, 1);
                }
                return sitesSrvc.saveSite(site);
            })
            .then(function() {
                return user;
            });
    }

    function removeUser(user) {
        return user.removeAsync();
    }
};

// TODO: test it
exports.savePwIfRecentTokenOrNoPw = function(userId, password) {
    //todo - have I got this right or should it only be with the valid token??
    return User
        .findOne({
            _id: userId
        })
        .select('+hashed_pwd +salt').execAsync()
        .then(function(user) {
            /* jshint camelcase: false */
            if (user.hashed_pwd) {
                return tokensSrvc.verifyHasRecentPwResetToken(user)
                    .then(setPassword)
                    .then(saveUser);
            } else {
                return setPassword(user)
                    .then(saveUser);
            }
        });

    function setPassword(user) {
        return new Promise(function(resolve) {
            user.salt = encrypt.createSalt();
            /* jshint camelcase: false */
            user.hashed_pwd = encrypt.hashPwd(user.salt, password);
            resolve(user);
        });
    }
};

function _createNewUser(userData, userSiteRoles) {
    return getUser({
            email: userData.email
        })
        .then(function(newUser) {
            if (newUser) {
                return newUser;
            }
            if (userData.password) {
                userData.salt = encrypt.createSalt();
                /* jshint camelcase: false */
                userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
                userData.apiKey = encrypt.createApiKey(userData.email, userData.password);
            }
            if (userSiteRoles && userSiteRoles.indexOf('api') !== -1) {
                userData.verified = Date.now();
            }
            return User.createAsync(userData);
        });
}

function _updateLinkedResource(user, linkedResource) {
    function updateLinkedResource(params, practitioner, cb) {
        
        params.site = user.currentSite;
        resourcesSrvc
            .getResource(params)
            .then(function(resource) {
                if (resource) {
                    resource.practitioner = practitioner;
                    return resourcesSrvc.saveResource(resource);
                }
            })
            .then(function() {
                cb();
            });
    }
    
    return new Promise(function(resolve, reject) {
        async.parallel({
            updatePrevLinkedResource: function(cb) {
                updateLinkedResource({ practitioner: user._id }, null, cb);
            },
            updateNewLinkedResource: function(cb) {
                if (linkedResource) {
                    updateLinkedResource({ _id: linkedResource }, user, cb);
                } else {
                    cb();
                }
            }
        },
        function(err) {
            if (err) { return reject(err); }
            resolve(user);
        });
    });
}

