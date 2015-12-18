var tokensSrvc = require('../services/tokens');
var httpUtil   = require('../util/httpUtil');

// TODO: test it
exports.handleToken = function (req, res, next) {
    return tokensSrvc
        .handleTokenId(req.params.tokenId)
        .then(function (data) {
            return res.send(data);
        })
        .catch(function (err) {
            httpUtil.processError(err, 'json', res, next);
        });
};
