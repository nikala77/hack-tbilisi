var _              = require('lodash');
var formidable     = require('formidable');
var imagesSrvc     = require('../util/images');
var clientsSrvc    = require('../services/clients');
var usersSrvc      = require('../services/users');
var resourcesSrvc  = require('../services/resources');
var sitesSrvc      = require('../services/sites');
var httpUtil       = require('../util/httpUtil');
var errorUtil      = require('../util/errorUtil');
var validationUtil = require('../util/validationUtil');

var validTypes = ['client', 'user', 'resource', 'site'];

// TODO: test it
exports.uploadPic = function(req, res, next) {
    var type = req.query.type;
    var _id = req.query._id;
    var currentUser = req.user;
    
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            return httpUtil.processError(err, 'json', res, next);
        }
        if (!files) {
            err = errorUtil.getUnprocessableRequestError('No files received ;(');
            return httpUtil.processError(err, 'json', res, next);
        }
        if (_.indexOf(validTypes, type) === -1) {
            err = errorUtil.getUnprocessableRequestError('type', type);
            return httpUtil.processError(err, 'json', res, next);
        }
        
        var params = {
            _id: _id,
            siteId: currentUser.currentSite,
            type: type + 's/pics'
        };
        
        return imagesSrvc
            .putImage(params, files.image)
            .then(function() {
                _updateDbRecord(_id, type, currentUser);
            })
            .then(function() {
                return res.status(200).end();
            })
            .catch(function(err) {
                return httpUtil.processError(err, 'json', res, next);
            });
    });
};

// TODO: test it
module.exports.copyPic = function(req, res, next) {
    var srcId = req.query.srcId;
    var srcType = req.query.srcType;
    var dstId = req.query.dstId;
    var dstType = req.query.dstType;
    var currentUser = req.user;
    
    function validate() {
        if (!validationUtil.isValidObjectId(srcId)) {
            return errorUtil.rejectWithUnprocessableRequestError('srcId', srcId);
        }
        if (!validationUtil.isValidObjectId(dstId)) {
            return errorUtil.rejectWithUnprocessableRequestError('dstId', dstId);
        }
        if (_.indexOf(validTypes, srcType) === -1) {
            return errorUtil.rejectWithUnprocessableRequestError('srcType', srcType);
        }
        if (_.indexOf(validTypes, dstType) === -1) {
            return errorUtil.rejectWithUnprocessableRequestError('dstType', dstType);
        }
        return errorUtil.resolve();
    }
    
    var params = {
        siteId: currentUser.currentSite,
        srcId: srcId,
        dstId: dstId,
        srcType: srcType + 's/pics',
        dstType: dstType + 's/pics',
    };
    
    return validate()
        .then(function() {
            return imagesSrvc.copyImage(params);
        })
        .then(function() {
            _updateDbRecord(dstId, dstType, currentUser);
        })
        .then(function() {
            return res.status(200).end();
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

function _updateDbRecord(id, type, currentUser) {
    var getFunc;
    var saveFunc;
    
    switch (type) {
        case 'client':
            getFunc = clientsSrvc.getClient;
            saveFunc = clientsSrvc.saveClient;
            break;
        case 'user':
            getFunc = usersSrvc.getUser;
            saveFunc = usersSrvc.saveUser;
            break;
        case 'resource':
            getFunc = resourcesSrvc.getResource;
            saveFunc = resourcesSrvc.saveResource;
            break;
        case 'site':
            getFunc = sitesSrvc.getSite;
            saveFunc = sitesSrvc.saveSite;
            break;
    }
    
    return getFunc({
            _id: id
        })
        .then(function(obj) {
            if (obj) {
                obj.pic = 's3';
                obj.lastEditedBy = currentUser;
                return saveFunc(obj);
            }
        });
}
