var patchesSrvc = require('../services/patches');
var httpUtil    = require('../util/httpUtil');

// TODO: test it
exports.getPatches = function(req, res, next) {
    req.params.site = req.user.currentSite;
    req.params.apiUser = req.user._id;
    
    return patchesSrvc
        .getPatches(req.params)
        .then(function(patches) {
            return res.send(patches);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.deletePatch = function(req, res, next) {
    req.params.site = req.user.currentSite;
    
    return patchesSrvc
        .deletePatch(req.params)
        .then(function() {
            res.send();
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};
