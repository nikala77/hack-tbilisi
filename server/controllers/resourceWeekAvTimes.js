var _                       = require('lodash');
var moment                  = require('moment');
var resourceWeekAvTimesSrvc = require('../services/resourceWeekAvTimes');
var httpUtil                = require('../util/httpUtil');
var errorUtil               = require('../util/errorUtil');
var validationUtil          = require('../util/validationUtil');

exports.getResourceWeekAvTimes = function(req, res, next) {
    var params = {
        site: req.user.currentSite,
        resource: req.query.resource,
        year: Number(req.query.year),
        weeknumber: Number(req.query.weeknumber)
    };
    
    function validateParams() {
        var ret = _validateGeneralParams(params);
        if (ret) {
            return ret;
        }
        return errorUtil.resolve();
    }
    
    validateParams()
        .then(function() {
            var keys = 'resource year weeknumber blocks';
            return resourceWeekAvTimesSrvc.getResourceWeekAvTimes(params, keys);
        })
        .then(function(resourceWeekAvTimes) {
            res.send(resourceWeekAvTimes);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.saveResourceWeekAvTimes = function(req, res, next) {
    var resourceWatData;
    var searchQuery;
    
    function parseParams() {
        var allowedFields = ['resource', 'year', 'weeknumber'];
        var allowedBlockFields = ['regionId', 'weekday', 'start', 'end'];
        resourceWatData = _.pick(req.body, allowedFields);
        resourceWatData.blocks = _(req.body.blocks)
            .map(function(block) {
                return _.pick(block, allowedBlockFields);
            })
            .value();
        resourceWatData.site = req.user.currentSite;
        
        searchQuery = {
            site: req.user.currentSite,
            resource: req.body.resource,
            year: Number(req.body.year),
            weeknumber: Number(req.body.weeknumber)
        };
        return errorUtil.resolve();
    }
    
    function validateBlocks(blocks) {
        var errorRes;
        _.each(blocks, function(block) {
            errorRes = validateBlock(block);
            if (errorRes) {
                return false;
            }
        });
        if (errorRes) {
            return errorUtil.rejectWithUnprocessableRequestError('blocks.' + errorRes.key, errorRes.value);
        }
        // TODO: start < end
        // TODO: only regionId in regions
    }

    function validateBlock(block) {
        if (!_.isFinite(block.regionId) || block.regionId < 0) {
            return { key: 'regionId', value: block.regionId };
        }
        if (!_.isFinite(block.weekday) || block.weekday < 0 || block.weekday > 6) {
            return { key: 'weekday', value: block.weekday };
        }
        if (!_.isFinite(block.start) || block.start < 0 || block.start > 1440) {
            return { key: 'start', value: block.start };
        }
        if (!_.isFinite(block.end) || block.end < 0 || block.end > 1440) {
            return { key: 'end', value: block.end };
        }
    }
    
    function validateParams() {
        var ret = _validateGeneralParams(searchQuery);
        if (ret) {
            return ret;
        }
        ret = _validateGeneralParams(resourceWatData);
        if (ret) {
            return ret;
        }
        ret = validateBlocks(resourceWatData.blocks);
        if (ret) {
            return ret;
        }
        return errorUtil.resolve();
    }
    
    parseParams()
        .then(validateParams)
        .then(function() {
            return resourceWeekAvTimesSrvc.getResourceWeekAvTimes(searchQuery);
        })
        .then(function(resourceWeekAvTimes) {
            if (!resourceWeekAvTimes) {
                return resourceWeekAvTimesSrvc.createResourceWeekAvTimes(resourceWatData);
            }
            resourceWeekAvTimes.blocks = resourceWatData.blocks;
            return resourceWeekAvTimesSrvc.saveResourceWeekAvTimes(resourceWeekAvTimes);
        })
        .then(function() {
            res.status(200).end();
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.cloneResourceWeekAvTimes = function(req, res, next) {
    var searchQuery;
    
    function buildQuery() {
        searchQuery = {
            site: req.user.currentSite,
            resource: req.body.resource,
            year: Number(req.body.year),
            weeknumber: Number(req.body.weeknumber)
        };
        return errorUtil.resolve();
    }
    
    function validateParams() {
        var ret = _validateGeneralParams(searchQuery);
        if (ret) {
            return ret;
        }
        return errorUtil.resolve();
    }
    
    function deleteExistingBlocks() {
        var params = {
            site: req.user.currentSite,
            resource: req.body.resource,
            $or: [
                {
                    year: { $gt: searchQuery.year }
                },
                {
                    $and: [
                        {
                            year: searchQuery.year,
                            weeknumber: { $gt: searchQuery.weeknumber }
                        }
                    ]
                }
            ]
        };
        return resourceWeekAvTimesSrvc.deleteResourceWeekAvTimesList(params);
    }
    
    function cloneBlocks() {
        var newResourceWats = [];
        var start = moment(searchQuery.year + '' + searchQuery.weeknumber, 'YYYYw').add(1, 'week');
        while (start.year() < 2021) {
            var resourceWat = {
                site: searchQuery.site,
                resource: searchQuery.resource,
                year: start.year(),
                weeknumber: start.week(),
                blocks: resourceWeekAvTimes.blocks
            };
            newResourceWats.push(resourceWat);
            start.add(1, 'week');
        }
        createdResouceWeekAvTimes = newResourceWats.length;
        return resourceWeekAvTimesSrvc.createResourceWeekAvTimes(newResourceWats);
    }
    
    var createdResouceWeekAvTimes;
    var resourceWeekAvTimes;
    buildQuery()
        .then(validateParams)
        .then(function() {
            var keys = 'blocks';
            return resourceWeekAvTimesSrvc.getResourceWeekAvTimes(searchQuery, keys);
        })
        .then(function(inst) {
            resourceWeekAvTimes = inst;
            if (!resourceWeekAvTimes) {
                return errorUtil.rejectWithObjectNotFoundError('resourceWeekAvTimes');
            }
            return deleteExistingBlocks();
        })
        .then(cloneBlocks)
        .then(function() {
            res.send({ createdResouceWeekAvTimes: createdResouceWeekAvTimes });
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

function _validateGeneralParams(params) {
    if (!validationUtil.isValidObjectId(params.resource)) {
        return errorUtil.rejectWithUnprocessableRequestError('resource', params.resource);
    }
    if (!_.isFinite(params.year) || params.year < 2015 || params.year > 2020) {
        return errorUtil.rejectWithUnprocessableRequestError('year', params.year);
    }
    if (!_.isFinite(params.weeknumber) || params.weeknumber < 1 || params.weeknumber > 53) {
        return errorUtil.rejectWithUnprocessableRequestError('weeknumber', params.weeknumber);
    }
}
