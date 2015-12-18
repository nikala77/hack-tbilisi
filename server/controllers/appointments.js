var _                = require('lodash');
var Promise          = require('bluebird');
var moment           = require('moment');
var appointmentsSrvc = require('../services/appointments');
var ical             = require('../util/ical');
var httpUtil         = require('../util/httpUtil');
var errorUtil        = require('../util/errorUtil');
var validationUtil   = require('../util/validationUtil');

exports.getAppointments = function(req, res, next) {
    var params = {
        start: moment(req.query.start, moment.defaultFormat),
        end: moment(req.query.end, moment.defaultFormat),
        resources: req.query.resources,
        clients: req.query.clients,
        includes: req.query.includes
    };
    var keys = ['appointmentTypeName', 'appointmentTemplate', 'clients', 'resources',
                'start', 'end', 'duration', 'color', 'textColor'];
    
    function validateParams() {
        var allowedIncludes = ['appointmentTemplate', 'clients', 'resources'];
        
        return new Promise(function (resolve, reject) {
            if (!validationUtil.isDate(params.start)) {
                return reject(errorUtil.getUnprocessableRequestError('start', 'Invalid date'));
            }
            if (!validationUtil.isDate(params.end)) {
                return reject(errorUtil.getUnprocessableRequestError('end', 'Invalid date'));
            }
            if (params.end < params.start) {
                return reject(errorUtil.getUnprocessableRequestError('end', 'End must be greater than Start'));
            }
            if (!_.isUndefined(params.clients) &&
                (!_.isArray(params.clients) || !_.all(params.clients, validationUtil.isValidObjectId))) {
                return reject(errorUtil.getUnprocessableRequestError('clients', 'Invalid array or contains invalid id'));
            }
            if (!_.isUndefined(params.resources)  &&
                (!_.isArray(params.resources) || !_.all(params.resources, validationUtil.isValidObjectId))) {
                return reject(errorUtil.getUnprocessableRequestError('resources', 'Invalid array or contains invalid id'));
            }
            if (!_.isUndefined(params.includes) && 
                (!_.isArray(params.includes) || _.difference(params.includes, allowedIncludes).length > 0)) {
                return reject(errorUtil.getUnprocessableRequestError('includes', 'Invalid array or contains invalid ref'));
            }
            resolve();
        });
    }
    
    function buildQuery() {
        _.each(params.includes, function(include) {
            if (include === 'appointmentTemplate') {
                keys.push('appointmentTemplate.name');
            } else if (include === 'clients') {
                keys.push('clients.firstName:lastName:knownAs:pic');
            } else if (include === 'resources') {
                keys.push('resources.name:pic:appointmentInterval');
            }
        });

        var query = {
            site: req.user.currentSite,
            $and: [
                {
                    start: { $gte: params.start }
                }, 
                {
                    end: { $lt: params.end }
                }
            ]
        };
        
        if (params.clients) {
            query.clients = { $in: params.clients };
        }
        if (params.resources) {
            query.resources = { $in: params.resources };
        }
        
        return new Promise(function(resolve) {
            resolve(query);
        });
    }

    return validateParams()
        .then(buildQuery)
        .then(function(query) {
            return appointmentsSrvc.getAppointments(query, keys.join(' '));
        })
        .then(function(appointments) {
            return res.send(appointments);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.getAppointmentById = function(req, res, next) {
    var query = {
        _id: req.params._id,
        site: req.user.currentSite,
    };
    var params = {
        includes: req.query.includes
    };
    var keys = ['appointmentTypeName', 'appointmentTemplate', 'clients', 'resources',
                'start', 'duration', 'color', 'textColor', 'note'];
    
    function validateParams() {
        var allowedIncludes = ['appointmentTemplate', 'clients', 'resources'];
        
        if (!validationUtil.isValidObjectId(query._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', 'Invalid id');
        }
        if (!_.isUndefined(params.includes) &&
            (!_.isArray(params.includes) || _.difference(params.includes, allowedIncludes).length > 0)) {
            return errorUtil.rejectWithUnprocessableRequestError('includes', 'Invalid array or contains invalid ref');
        }
        return errorUtil.resolve();
    }
    
    function buildQuery() {
        _.each(params.includes, function(include) {
            if (include === 'appointmentTemplate') {
                keys.push('appointmentTemplate.name');
            }
            if (include === 'clients') {
                keys.push('clients.firstName:lastName:knownAs:pic');
            }
            if (include === 'resources') {
                keys.push('resources.name:pic');
            }
        });
    }
    
    validateParams()
        .then(buildQuery)
        .then(function() {
            return appointmentsSrvc.getAppointment(query, keys.join(' '));
        })
        .then(function(appointment) {
            if (!appointment) {
                return errorUtil.rejectWithObjectNotFoundError('appointment');
            }
            res.send(appointment);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.getHashList = function(req, res, next) {
    var params = {
        site: req.user.currentSite,
        start: {
            $gt: moment().subtract(7, 'days')
        }
    };
    
    return appointmentsSrvc
        .getHashList(params)
        .then(function(hashList) {
            return res.send(hashList);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.createAppointment = function(req, res, next) {
    var appointmentData;
    var allowedFields = ['appointmentTypeName', 'appointmentTemplate', 'clients',
                         'resources', 'start', 'duration', 'color', 'textColor', 'note'];
    
    function parseParams() {
        appointmentData = _.pick(req.body, allowedFields);
        appointmentData.duration = parseFloat(appointmentData.duration);
        setEmptyRefToNull(appointmentData, 'appointmentTemplate');
        return errorUtil.resolve();
    }
    
    function doEdits() {
        appointmentData.site = req.user.currentSite;
        appointmentData.lastEditedBy = req.user;
        appointmentData.end = moment(appointmentData.start, moment.defaultFormat)
            .add(appointmentData.duration, 'minutes');
    }
    
    function formatResult(appointment) {
        var fields = ['_id', 'end'].concat(allowedFields);
        return _.pick(appointment, fields);
    }
    
    parseParams()
        .then(function() {
            return _validateParams(appointmentData);
        })
        .then(doEdits)
        .then(function() {
            return appointmentsSrvc.createAppointment(appointmentData);
        })
        .then(ical.updateIcals)
        .then(formatResult)
        .then(function(appointment) {
            res.send(appointment);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateAppointment = function(req, res, next) {
    var appointmentData;
    var searchQuery;
    var allowedFields = ['appointmentTypeName', 'appointmentTemplate', 'clients',
                         'resources', 'start', 'duration', 'color', 'textColor', 'note'];
    
    function parseParams() {
        appointmentData = _.pick(req.body, allowedFields);
        appointmentData.duration = parseFloat(appointmentData.duration);
        setEmptyRefToNull(appointmentData, 'appointmentTemplate');
        
        searchQuery = {
            _id: req.params._id,
            site: req.user.currentSite
        };
        return errorUtil.resolve();
    }
    
    function doEdits(appointment) {
        _.assign(appointment, appointmentData);
        appointment.lastEditedBy = req.user;
        appointment.end = moment(appointment.start)
            .add(appointmentData.duration, 'minutes');
        return appointment;
    }
    
    function formatResult(appointment) {
        var fields = ['_id', 'end'].concat(allowedFields);
        return _.pick(appointment, fields);
    }
    
    parseParams()
        .then(function() {
            return _validateSearchQuery(searchQuery);
        })
        .then(function() {
            return _validateParams(appointmentData);
        })
        .then(function() {
            return appointmentsSrvc.getAppointment(searchQuery);
        })
        .then(function(appointment) {
            if (!appointment) {
                return errorUtil.rejectWithObjectNotFoundError('appointment');
            }
            return appointment;
        })
        .then(doEdits)
        .then(appointmentsSrvc.saveAppointment)
        .then(ical.updateIcals)
        .then(formatResult)
        .then(function(appointment) {
            res.send(appointment);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateAppointmentDates = function(req, res, next) {
    var appointmentData;
    var searchQuery;
    var allowedFields = ['start', 'end'];
    
    function parseParams() {
        appointmentData = _.pick(req.body, allowedFields);
        searchQuery = {
            _id: req.params._id,
            site: req.user.currentSite
        };
        return errorUtil.resolve();
    }
    
    function doEdits(appointment) {
        _.assign(appointment, appointmentData);
        appointment.lastEditedBy = req.user;
        var start = moment(appointment.start);
        var end = moment(appointment.end);
        appointment.duration = moment.duration(end - start).asMinutes();
        return appointment;
    }
    
    function formatResult(appointment) {
        var fields = ['_id', 'duration'].concat(allowedFields);
        return _.pick(appointment, fields);
    }
    
    parseParams()
        .then(function() {
            return _validateSearchQuery(searchQuery);
        })
        .then(function() {
            return _validateDates(appointmentData);
        })
        .then(function() {
            return appointmentsSrvc.getAppointment(searchQuery);
        })
        .then(function(appointment) {
            if (!appointment) {
                return errorUtil.rejectWithObjectNotFoundError('appointment');
            }
            return appointment;
        })
        .then(doEdits)
        .then(appointmentsSrvc.saveAppointment)
        .then(formatResult)
        .then(function(appointment) {
            res.send(appointment);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

function _validateSearchQuery(searchQuery) {
    if (!searchQuery._id || !validationUtil.isValidObjectId(searchQuery._id)) {
        return errorUtil.rejectWithUnprocessableRequestError('_id', searchQuery._id);
    }
}

function _validateDates(appointmentData) {
    if (!appointmentData.start || !moment(appointmentData.start, moment.defaultFormat).isValid()) {
        return errorUtil.rejectWithUnprocessableRequestError('start', 'Missing or invalid date');
    }
    if (moment(appointmentData.start, moment.defaultFormat) < moment()) {
        return errorUtil.rejectWithUnprocessableRequestError('start', 'Can\'t update appointment in the past');
    }
    if (!appointmentData.end || !moment(appointmentData.end, moment.defaultFormat).isValid()) {
        return errorUtil.rejectWithUnprocessableRequestError('end', 'Missing or invalid date');
    }
    if (moment(appointmentData.end, moment.defaultFormat) < moment(appointmentData.start, moment.defaultFormat)) {
        return errorUtil.rejectWithUnprocessableRequestError('end', 'End must be greater than Start');
    }
}

function _validateParams(appointmentData) {
    if (!appointmentData.appointmentTypeName) {
        return errorUtil.rejectWithUnprocessableRequestError('appointmentTypeName', 'Missing');
    }
    if (appointmentData.appointmentTemplate && !validationUtil.isValidObjectId(appointmentData.appointmentTemplate)) {
        return errorUtil.rejectWithUnprocessableRequestError('appointmentTemplate', 'Invalid id');
    }
    if (!appointmentData.start || !moment(appointmentData.start, moment.defaultFormat).isValid()) {
        return errorUtil.rejectWithUnprocessableRequestError('start', 'Missing or invalid date');
    }
    if (moment(appointmentData.start, moment.defaultFormat) < moment()) {
        return errorUtil.rejectWithUnprocessableRequestError('start', 'Can\'t create/update appointment in the past');
    }
    if (!appointmentData.duration || isNaN(appointmentData.duration) || appointmentData.duration < 0) {
        return errorUtil.rejectWithUnprocessableRequestError('duration', 'Invalid number or less than 0');
    }
    if (appointmentData.clients && 
        (!_.isArray(appointmentData.clients) || !_.all(appointmentData.clients, validationUtil.isValidObjectId))) {
        return errorUtil.rejectWithUnprocessableRequestError('clients', 'Invalid array or contains invalid id');
    }
    if (appointmentData.resources && 
        (!_.isArray(appointmentData.resources) || !_.all(appointmentData.resources, validationUtil.isValidObjectId))) {
        return errorUtil.rejectWithUnprocessableRequestError('resources', 'Invalid array or contains invalid id');
    }
    return errorUtil.resolve();
}

// TODO: move to mongoose ot utils
function setEmptyRefToNull(obj, key) {
    obj[key] = obj[key] || null;
}
