'use strict';

var Promise                   = require('bluebird');
var ObjectNotFoundError       = require('../errors/objectNotfoundError');
var InvalidOjectIdError       = require('../errors/invalidObjectidError');
var AccessDeniedError         = require('../errors/accessDeniedError');
var UnprocessableRequestError = require('../errors/unprocessableRequestError');
var UnauthorizedError         = require('../errors/unauthorizedError');
var DuplicateObjectError      = require('../errors/duplicateObjectError');

// TODO: test it
module.exports = {
    isInvalidObjectIdError: function(err) {
        return err instanceof InvalidOjectIdError;
    },
    isObjectNotFoundError: function(err) {
        return err instanceof ObjectNotFoundError;
    },
    isObjectValidationError: function(err) {
        return ((err.name === 'ValidationError') || 
                (err.message.indexOf('ValidationError') !== -1)); // TODO: use type?
    },
    isAccessDeniedError: function(err) {
        return err instanceof AccessDeniedError;
    },
    isUnauthorizedError: function(err) {
        return err instanceof UnauthorizedError;
    },
    isUnprocessableRequestError: function(err) {
        return err instanceof UnprocessableRequestError;
    },
    isDuplicateObjectError: function(err) {
        return err instanceof DuplicateObjectError;
    },
    getAccessDeniedError: function(msg, info) {
        return new AccessDeniedError(msg, info);
    },
    getUnauthorizedError: function(msg, info) {
        return new UnauthorizedError(msg, info);
    },
    getUnprocessableRequestError: function(paramName, paramValue) {
        var msg;
        if (arguments.length === 1) {
            msg = paramName;
        } else {
            msg = 'Invalid parameter ' + paramName + ', val=' + paramValue;
        }
        return new UnprocessableRequestError(msg);
    },
    getObjectNotFoundError: function(msg, info) {
        return new ObjectNotFoundError(msg, info);
    },
    getDuplicateObjectError: function(msg, info) {
        return new DuplicateObjectError(msg, info);
    },
    getInvalidObjectError: function(msg, info) {
        return new InvalidOjectIdError(msg, info);
    },
    
    resolve: function(data) {
        return new Promise(function(resolve) {
            resolve(data);
        });
    },
    rejectWithAccessDeniedError: function(msg, info) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var err = self.getAccessDeniedError(msg, info);
            reject(err);
        });
    },
    rejectWithUnprocessableRequestError: function(paramName, paramValue) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var err = self.getUnprocessableRequestError(paramName, paramValue);
            reject(err);
        });
    },
    rejectWithObjectNotFoundError: function(msg, info) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var err = self.getObjectNotFoundError(msg, info);
            reject(err);
        });
    },
    rejectWithObjectInvalidError: function(msg, info) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var err = self.getInvalidObjectError(msg, info);
            reject(err);
        });
    },
    rejectWithDuplicateObjectError: function(msg, info) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var err = self.getDuplicateObjectError(msg, info);
            reject(err);
        });
    }
};
