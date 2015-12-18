var _              = require('lodash');
var resourcesSrvc  = require('../services/resources');
var httpUtil       = require('../util/httpUtil');
var errorUtil      = require('../util/errorUtil');
var validationUtil = require('../util/validationUtil');

exports.getResources = function(req, res, next) {
    var params = {
        site: req.user.currentSite
    };
    var keys = ['name', 'appointmentInterval', 'pic', 'practitioner', 'description'];
    
    function validateParams() {
        var allowedIncludes = ['practitioner'];
        var includes = req.query.includes;
        var practitioner = req.query.practitioner;
        
        if (_.has(req.query, 'includes') && (!_.isArray(includes) || _.difference(includes, allowedIncludes).length > 0)) {
            return errorUtil.rejectWithUnprocessableRequestError('includes', includes);
        }
        if (_.has(req.query, 'practitioner') && practitioner && !validationUtil.isValidObjectId(practitioner)) {
            return errorUtil.rejectWithUnprocessableRequestError('practitioner', practitioner);
        }
        return errorUtil.resolve();
    }
    
    function buildQuery() {
        _.each(req.query.includes, function(include) {
            if (include === 'practitioner') {
                keys.push('practitioner.displayName:firstName:lastName');
            }
        });
        if (_.has(req.query, 'practitioner')) {
            params.practitioner = req.query.practitioner || null;
        }
    }
    
    validateParams()
        .then(buildQuery)
        .then(function() {
            return resourcesSrvc.getResources(params, keys.join(' '));
        })
        .then(function(resources) {
            res.send(resources);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.getResourceById = function(req, res, next) {
    var params = {
        _id: req.params._id,
        site: req.user.currentSite,
    };
    
    function validateParams() {
        if (!validationUtil.isValidObjectId(params._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', params._id);
        }
        return errorUtil.resolve();
    }
    
    validateParams()
        .then(function() {
            return resourcesSrvc.getResource(params);
        })
        .then(function(resource) {
            if (!resource) {
                return errorUtil.rejectWithObjectNotFoundError('resource');
            }
            res.send(resource);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.getHashList = function(req, res, next) {
    var params = {
        site: req.user.currentSite
    };
    
    return resourcesSrvc
        .getHashList(params)
        .then(function(hashList) {
            return res.send(hashList);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.createResource = function(req, res, next) {
    var resourceData;
    
    function parseParams() {
        var allowedFields = ['name', 'description', 'status', 'practitioner', 'appointmentInterval'];
        resourceData = _.pick(req.body, allowedFields);
        resourceData.site = req.user.currentSite;
        resourceData.lastEditedBy = req.user;
        return errorUtil.resolve();
    }
    
    function validateParams() {
        if (!resourceData.name) {
            return errorUtil.rejectWithUnprocessableRequestError('name', resourceData.name);
        }
        if (!resourceData.appointmentInterval) {
            return errorUtil.rejectWithUnprocessableRequestError('appointmentInterval', resourceData.appointmentInterval);
        }
        return errorUtil.resolve();
    }
    
    parseParams()
        .then(validateParams)
        .then(function() {
            return resourcesSrvc.createResource(resourceData);
        })
        .then(function(resource) {
            res.send(resource);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateResource = function(req, res, next) {
    var resourceData;
    var searchQuery;
    
    function parseParams() {
        var allowedFields = ['name', 'description', 'status', 'practitioner', 'appointmentInterval'];
        resourceData = _.pick(req.body, allowedFields);
        searchQuery = {
            _id: req.params._id,
            site: req.user.currentSite
        };
        return errorUtil.resolve();
    }
    
    function validateParams() {
        if (!searchQuery._id || !validationUtil.isValidObjectId(searchQuery._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', searchQuery._id);
        }
        if (!resourceData.name) {
            return errorUtil.rejectWithUnprocessableRequestError('name');
        }
        if (!resourceData.appointmentInterval) {
            return errorUtil.rejectWithUnprocessableRequestError('appointmentInterval');
        }
        return errorUtil.resolve();
    }
    
    function doEdits(resource) {
      _.assign(resource, resourceData);
      resource.lastEditedBy = req.user;
      return resource;
    }
    
    parseParams()
        .then(validateParams)
        .then(function() {
            return resourcesSrvc.getResource(searchQuery);
        })
        .then(function(resource) {
            if (!resource) {
                return errorUtil.rejectWithObjectNotFoundError('resource');
            }
            return resource;
        })
        .then(doEdits)
        .then(resourcesSrvc.saveResource)
        .then(function(resource) {
            res.send(resource);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateResourceRegions = function(req, res, next) {
    var regions = {};
    var searchQuery;
    
    function parseParams() {
        var allowedFields = ['id', 'name', 'bgColor', 'appointmentTemplates'];
        regions = _(req.body.regions)
            .map(function(region) {
                return _.pick(region, allowedFields);
            })
            .value();
        searchQuery = {
            _id: req.params._id,
            site: req.user.currentSite
        };
        return errorUtil.resolve();
    }
    
    function validateRegions(regions) {
        if (!_.isArray(regions) || regions.length === 0) {
            return errorUtil.rejectWithUnprocessableRequestError('regions');
        }
    
        var errorRes;
        _.each(regions, function(region) {
            errorRes = validateRegion(region);
            if (errorRes) {
                return false;
            }
        });
        if (errorRes) {
            return errorUtil.rejectWithUnprocessableRequestError('regions.' + errorRes.key, errorRes.value);
        }
    
        var regionIds = _.pluck(regions, 'id');
        if (_.uniq(regionIds).length !== regions.length) {
            return errorUtil.rejectWithUnprocessableRequestError('regions.ids');
        }
        // TODO: validate that two required blocks (Avaliable and NotAvaliable) are present
    }
    
    function validateRegion(region) {
        if (!_.isFinite(region.id) || region.id < 0) {
            return { key: 'id', value: region.id };
        }
        if (!_.isString(region.name) || region.name.length === '') {
            return { key: 'name', value: region.name };
        }
        if (!_.isString(region.bgColor) || region.bgColor === '') {
            return { key: 'bgColor', value: region.bgColor };
        }
        if (region.appointmentTemplates && 
            (!_.isArray(region.appointmentTemplates) || !_.all(region.appointmentTemplates, validationUtil.isValidObjectId))) {
            return { key: 'appointmentTemplates', value: region.appointmentTemplates };
        }
    }
    
    function validateParams() {
        if (!searchQuery._id || !validationUtil.isValidObjectId(searchQuery._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', searchQuery._id);
        }
        var ret = validateRegions(regions);
        if (ret) {
            return ret;
        }
        return errorUtil.resolve();
    }
    
    function doEdits(resource) {
        resource.regions = regions;
        resource.lastEditedBy = req.user;
        return resource;
    }
    
    parseParams()
        .then(validateParams)
        .then(function() {
            return resourcesSrvc.getResource(searchQuery);
        })
        .then(function(resource) {
            if (!resource) {
                return errorUtil.rejectWithObjectNotFoundError('resource');
            }
            return resource;
        })
        .then(doEdits)
        .then(resourcesSrvc.saveResource)
        .then(function(resource) {
            res.send(resource);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.deleteResource = function(req, res, next) {
    req.params.site = req.user.currentSite;
    
    return resourcesSrvc
        .getResource(req.params)
        .then(resourcesSrvc.deleteResource)
        .then(function() {
            res.send();
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};
