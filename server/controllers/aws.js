var awsSrvc        = require('../util/aws');
var httpUtil       = require('../util/httpUtil');
var errorUtil      = require('../util/errorUtil');
var validationUtil = require('../util/validationUtil');

// TODO: test it
exports.getSignedUrl = function (req, res, next) {
    var type = req.query.type;
    var key = req.query.key;
    
    function validate() {
        return new Promise(function (resolve, reject) {
            if (validationUtil.isEmptyString(type)) {
                return reject(errorUtil.getUnprocessableRequestError('type', type));
            }
            if (validationUtil.isEmptyString(key)) {
                return reject(errorUtil.getUnprocessableRequestError('key', key));
            }
            resolve();
        });
    }
    
    return validate() 
        .then(function() {
            return awsSrvc.getSignedUrl(req.user.currentSite.toString(), type, key);
        })
        .then(function (url) {
            res.send(url);
        })
        .catch(function (err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.getTemporaryCredentials = function (req, res, next) {
    return awsSrvc
        .getTemporaryCredentials(req.user.currentSite.toString())
        .then(function (credentials) {
            res.send(credentials);
        })
        .catch(function (err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.getTemporaryCredentialsSync = function (req, res, next) {
    return awsSrvc
        .getTemporaryCredentialsSync(req.user.currentSite, req.user._id)
        .then(function (credentials) {
            res.send(credentials);
        })
        .catch(function (err) {
            httpUtil.processError(err, 'json', res, next);
        });
};
