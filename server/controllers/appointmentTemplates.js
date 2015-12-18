var _              = require('lodash');
var Promise        = require('bluebird');
var atSrvc         = require('../services/appointmentTemplates');
var httpUtil       = require('../util/httpUtil');
var errorUtil      = require('../util/errorUtil');
var validationUtil = require('../util/validationUtil');

exports.getAppointmentTemplates = function (req, res, next) {
    var query = {
        site: req.user.currentSite
    };
    var keys = ['name', 'resources', 'color', 'textColor', 'duration'];
    
    function validateParams() {
        var allowedIncludes = ['resources'];
        var includes = req.query.includes;
        
        if (_.has(req.query, 'includes') && (!_.isArray(includes) || _.difference(includes, allowedIncludes).length > 0)) {
            return errorUtil.rejectWithUnprocessableRequestError('includes', 'Invalid array or contains invalid ref');
        }
        return Promise.resolve();
    }
    
    validateParams()
        .then(function() {
            return _buildQueryForGet(req.query, keys);
        })
        .then(function() {
            return atSrvc.getAppointmentTemplates(query, keys.join(' '));
        })
        .then(function (ats) {
            res.send(ats);
        })
        .catch(function (err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.getAppointmentTemplateById = function (req, res, next) {
    var query = {
        _id: req.params._id,
        site: req.user.currentSite,
    };
    var keys = ['name', 'resources', 'color', 'textColor', 'duration'];
    
    function validateParams() {
        var allowedIncludes = ['resources'];
        var includes = req.query.includes;
        
        if (!validationUtil.isValidObjectId(query._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', 'Invalid id');
        }
        if (_.has(req.query, 'includes') && (!_.isArray(includes) || _.difference(includes, allowedIncludes).length > 0)) {
            return errorUtil.rejectWithUnprocessableRequestError('includes', 'Invalid array or contains invalid ref');
        }
        return Promise.resolve();
    }
    
    validateParams()
        .then(function() {
            return _buildQueryForGet(req.query, keys);
        })
        .then(function() {
            return atSrvc.getAppointmentTemplate(query, keys.join(' '));
        })
        .then(function(at) {
            if (!at) {
                return errorUtil.rejectWithObjectNotFoundError('appointmentTemplate');
            }
            res.send(at);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.createAppointmentTemplate = function (req, res, next) {
    var atData;
    var allowedFields = ['name', 'resources', 'color', 'textColor', 'duration'];
    
    function parseParams() {
        atData = _.pick(req.body, allowedFields);
        atData.duration = parseFloat(atData.duration);
        return Promise.resolve();
    }
    
    function doEdits() {
        atData.site = req.user.currentSite;
        atData.lastEditedBy = req.user;
    }
    
    function formatResult(at) {
        var fields = ['_id'].concat(allowedFields);
        return _.pick(at, fields);
    }
    
    parseParams()
        .then(function() {
            return _validateParamsForSave(atData);
        })
        .then(doEdits)
        .then(function() {
            return atSrvc.createAppointmentTemplate(atData);
        })
        .then(formatResult)
        .then(function(appointment) {
            res.send(appointment);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateAppointmentTemplates = function (req, res, next) {
    var searchQuery;
    var atData;
    var allowedFields = ['name', 'resources', 'color', 'textColor', 'duration'];
    
    function parseParams() {
        atData = _.pick(req.body, allowedFields);
        atData.duration = parseFloat(atData.duration);
        searchQuery = {
            _id: req.params._id,
            site: req.user.currentSite
        };
        return Promise.resolve();
    }
    
    function validateSearchQuery() {
        if (!searchQuery._id || !validationUtil.isValidObjectId(searchQuery._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', 'Invalid id');
        }
    }
    
    function doEdits(at) {
        _.assign(at, atData);
        at.lastEditedBy = req.user;
        return at;
    }
    
    function formatResult(at) {
        var fields = ['_id'].concat(allowedFields);
        return _.pick(at, fields);
    }
    
    parseParams()
        .then(function() {
            return validateSearchQuery(searchQuery);
        })
        .then(function() {
            return _validateParamsForSave(atData);
        })
        .then(function() {
            return atSrvc.getAppointmentTemplate(searchQuery);
        })
        .then(function(at) {
            if (!at) {
                return errorUtil.rejectWithObjectNotFoundError('appointmentTemplate');
            }
            return at;
        })
        .then(doEdits)
        .then(atSrvc.saveAppointmentTemplate)
        .then(formatResult)
        .then(function(at) {
            res.send(at);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

function _buildQueryForGet(query, keys) {
    _.each(query.includes, function(include) {
        if (include === 'resources') {
            keys.push('resources.name');
        }
    });
}

function _validateParamsForSave(atData) {
    if (!atData.name) {
        return errorUtil.rejectWithUnprocessableRequestError('name', 'Missing');
    }
    if (atData.resources && 
        (!_.isArray(atData.resources) || !_.all(atData.resources, validationUtil.isValidObjectId))) {
        return errorUtil.rejectWithUnprocessableRequestError('resources', 'Invalid array or contains invalid id');
    }
    if (_.has(atData, 'duration') && (isNaN(atData.duration) || atData.duration < 0)) {
        return errorUtil.rejectWithUnprocessableRequestError('duration', 'Invalid number or less than 0');
    }
    return Promise.resolve();
}
