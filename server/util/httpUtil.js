var errorUtil = require('./errorUtil');

// TODO: test it
module.exports = {
    /* jshint maxstatements: 20 */
    processError: function(err, dataType, res, next) {
        if (arguments.length !== 4) {
            throw new Error('Invalid processError call. Must be called with err, dataType, res, next parameters');
        }
        
        var resStatus;
        if (errorUtil.isUnauthorizedError(err)) {
            resStatus = 401;
        } else if (errorUtil.isAccessDeniedError(err)) {
            resStatus = 403;
        } else if (errorUtil.isObjectNotFoundError(err)) {
            resStatus = 404;
        } else if (errorUtil.isInvalidObjectIdError(err)) {
            resStatus = 422;
        } else if (errorUtil.isObjectValidationError(err)) {
            resStatus = 422;
        } else if (errorUtil.isUnprocessableRequestError(err)) {
            resStatus = 422;
        } else if (errorUtil.isDuplicateObjectError(err)) {
            resStatus = 409;
        }
        
        if (resStatus) {
            res = res.status(resStatus);
            switch (dataType) {
                case 'json':
                    return res.json({ reason: err.message, info: err.info });
                case 'html':
                    return res.send(err.message);
                default:
                    return res.json({ reason: err.message, info: err.info });
            }
        }
        
        next(err);
    }
};
