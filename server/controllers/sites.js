var _              = require('lodash');
var sitesSrvc      = require('../services/sites');
var usersSrvc      = require('../services/users');
var httpUtil       = require('../util/httpUtil');
var errorUtil      = require('../util/errorUtil');
var validationUtil = require('../util/validationUtil');

exports.getSites = function(req, res, next) {
    var user;
    return usersSrvc
        .getUser({
            _id: req.user._id
        })
        .then(function(u) {
            user = u;
            var userSites = _.pluck(user.siteRoles, 'site');
            return sitesSrvc.getSites(
                { _id : { $in: userSites } },
                '_id name pic'
            );
        })
        .then(function(sites) {
            _.each(sites, function(site) {
                if (user.isOwner(site)) {
                    site._doc.isOwner = true;
                }
            });
            return sites;
        })
        .then(function(sites) {
            res.send(sites);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.getUserById = function(req, res, next) {
    var siteId = req.params._id;
    
    function validateParams() {
        if (!validationUtil.isValidObjectId(siteId)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', siteId);
        }
        return errorUtil.resolve();
    }
    
    validateParams()
        .then(function() {
            return usersSrvc.getUser({
                _id: req.user._id
            });
        })
        .then(function() {
            /* TODO: clarify
            if (user.currentSite.toString() !== siteId) {
                return errorUtil.rejectWithAccessDeniedError();
            }
            */
            return sitesSrvc.getSite(
                { _id: siteId },
                '-__v'
            );
        })
        .then(function(site) {
            if (!site) {
                return errorUtil.rejectWithObjectNotFoundError('site');
            }
            return site;
        })
        .then(function(site) {
            res.send(site);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.createSite = function(req, res, next) {
    var siteData;
    
    function parseParams() {
        var allowedFields = ['name', 'address', 'created', 'phone', 'email'];
        siteData = _.pick(req.body, allowedFields);
        return errorUtil.resolve();
    }
    
    function validate() {
        if (validationUtil.isEmptyString(siteData.name)) {
            return errorUtil.rejectWithUnprocessableRequestError('name', siteData.name);
        }
        if (siteData.email && !validationUtil.isValidEmail(siteData.email)) {
            return errorUtil.rejectWithUnprocessableRequestError('email', siteData.email);
        }
        return errorUtil.resolve();
    }
    
    parseParams()
        .then(validate)
        .then(function() {
            return usersSrvc.getUser({
                _id: req.user._id
            });
        })
        .then(function(user) {
            siteData.users = [user];
            return sitesSrvc.createSite(siteData, user);
        })
        .then(function(site) {
            res.send(site);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateSite = function(req, res, next) {
    var siteData;
    var searchQuery;
    
    function parseParams() {
        var allowedFields = ['name', 'address', 'created', 'phone', 'email'];
        siteData = _.pick(req.body, allowedFields);
        searchQuery = { _id: req.params._id };
        return errorUtil.resolve();
    }
    
    function validate() {
        if (!validationUtil.isValidObjectId(searchQuery._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', searchQuery._id);
        }
        if (!siteData.name) {
            return errorUtil.rejectWithUnprocessableRequestError('name');
        }
        if (siteData.email && !validationUtil.isValidEmail(siteData.email)) {
            return errorUtil.rejectWithUnprocessableRequestError('email', siteData.email);
        }
        return errorUtil.resolve();
    }
    
    function doEdits(site) {
      _.extend(site, siteData);
      return site;
    }
    
    var user;
    parseParams()
        .then(validate)
        .then(function() {
            return usersSrvc.getUser({
                _id: req.user._id
            });
        })
        .then(function(u) {
            user = u;
            return sitesSrvc.getSite({
                _id: searchQuery._id
            });
        })
        .then(function(site) {
            if (!site) {
                return errorUtil.rejectWithObjectNotFoundError('site');
            }
            if (!user.isOwner(site)) {
                return errorUtil.regectWithAccessDeniedError();
            }
            return site;
        })
        .then(doEdits)
        .then(sitesSrvc.saveSite)
        .then(function(site) {
            res.send(site);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.deleteSite = function(req, res, next) {
    var siteId = req.params._id;
    
    function validate() {
        if (!validationUtil.isValidObjectId(siteId)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', siteId);
        }
        if (req.user.currentSite.toString() === req.params._id) {
            return errorUtil.rejectWithAccessDeniedError('Cannot delete the current site');
        }
        return errorUtil.resolve();
    }
    
    validate()
        .then(function() {
            return usersSrvc.getUser({
                _id: req.user._id
            });
        })
        .then(function(user) {
            if (!user.isOwner(siteId)) {
                return errorUtil.regectWithAccessDeniedError();
            }
            return sitesSrvc
                .getSite({
                    _id: siteId
                });
        })
        .then(function(site) {
            if (site.hasData()) {
                return errorUtil.rejectWithUnprocessableRequestError('Site has data. Cannot be deleted');
            }
            return site;
        })
        .then(sitesSrvc.deleteSite)
        .then(function() {
            res.status(200).end();
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};
