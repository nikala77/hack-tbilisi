var _              = require('lodash');
var clientsSrvc    = require('../services/clients');
var httpUtil       = require('../util/httpUtil');
var errorUtil      = require('../util/errorUtil');
var validationUtil = require('../util/validationUtil');

// TODO: test it
exports.listClients = function(req, res, next) {
    req.query.site = req.user.currentSite;
    if (req.query._id && (typeof req.query._id !== 'string')) {
        var idSubquery = {};
        idSubquery.$in = req.query._id;
        req.query._id = idSubquery;
    }
    
    return clientsSrvc
        .listClients(req.query)
        .then(function(client) {
            return res.send(client);
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

/* jshint maxstatements: 25 */
// TODO: test it
exports.searchClients = function(req, res, next) {
    if (!req.query.q) {
        return res.status(400).end();
    }
    
    var q = req.query.q.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'); // clean for regex
    var query = {};
    query.site = req.user.currentSite;

    var regex;
    if (!isNaN(req.query.q)) {
        //number --> phone number
        regex = new RegExp(regexIgnoreSpaces(q), 'i');
        query.$or = [{
            phone: {
                $regex: regex
            }
        }, {
            mobile: {
                $regex: regex
            }
        }];
    } else {
        if (q.indexOf('@') > -1) {
            regex = new RegExp(q, 'i');
            query.email = {
                $regex: regex
            };
        } else {
            var qs = q.split(' ');
            var regex0 = new RegExp('^' + qs[0], 'i');
            if (qs.length === 1) {
                query.$or = [{
                    firstName: {
                        $regex: regex0
                    }
                }, {
                    lastName: {
                        $regex: regex0
                    }
                }];
            } else {
                var regex1 = new RegExp('^' + qs[1], 'i');
                query.$or = [{
                    firstName: {
                        $regex: regex0
                    },
                    lastName: {
                        $regex: regex1
                    }
                }, {
                    firstName: {
                        $regex: regex1
                    },
                    lastName: {
                        $regex: regex0
                    }
                }];
            }
        }
    }
    applyExcludes(query, req.query);

    function regexIgnoreSpaces(q) {
        var result = '';
        for (var i = 0; i < q.length; i++) {
            if (q[i] !== ' ') {
                result = result + q[i] + '\s*';
            }
        }
        return result;
    }

    function applyExcludes(query, reqQuery) {
        var ex;
        if (reqQuery.exclude) {
            if (typeof reqQuery.exclude === 'string') {
                ex = [reqQuery.exclude];
            } else {
                ex = reqQuery.exclude;
            }
            var excludeSubquery = {};
            excludeSubquery.$nin = ex;
            query._id = excludeSubquery;
        }
    }

    return clientsSrvc
        .listClients(query, 5)
        .then(function(clients) {
            return res.send(clients);
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

exports.getClientById = function(req, res, next) {
    var params = {
        _id: req.params._id,
        site: req.user.currentSite
    };
    
    function validate() {
        if (!validationUtil.isValidObjectId(params._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id', params._id);
        }
        return errorUtil.resolve();
    }
    
    validate()
        .then(function() {
            return clientsSrvc.getClient(params);
        })
        .then(function(client) {
            if (!client) {
                return errorUtil.rejectWithObjectNotFoundError('client');
            }
            return res.send(client);
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.getHashedClientById = function(req, res, next) {
    req.params.site = req.user.currentSite;
    
    return clientsSrvc
        .getHashedClient(req.params)
        .then(function(hashedClient) {
            return res.send(hashedClient);
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
    
    return clientsSrvc
        .getHashList(params)
        .then(function(hashList) {
            return res.send(hashList);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.createClient = function(req, res, next) {
    var clientData = {};
    
    function parseParams() {
        var allowedFields = ['firstName', 'knownAs', 'lastName', 'email', 'title', 
                             'dob', 'address', 'mobile', 'phone', 'occupation', 'hobbies', 'status'];
        clientData = _.pick(req.body, allowedFields);
        clientData.site = req.user.currentSite;
        clientData.lastEditedBy = req.user;
        return errorUtil.resolve();
    }
    
    function validate() {
        if (!clientData.firstName) {
            return errorUtil.rejectWithUnprocessableRequestError('firstName');
        }
        return errorUtil.resolve();
    }
    
    parseParams()
        .then(validate)
        .then(function() {
            return clientsSrvc.createClient(clientData);
        })
        .then(function(client) {
            return res.send(client);
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateClient = function(req, res, next) {
    var clientData = {};
    var searchQuery = {};
    
    function parseParams() {
        var allowedFields = ['firstName', 'knownAs', 'lastName', 'email', 'title', 
                             'dob', 'address', 'mobile', 'phone', 'occupation', 'hobbies', 'status'];
        clientData = _.pick(req.body, allowedFields);
        clientData.site = req.user.currentSite;
        searchQuery = {
            _id: req.params._id,
            site: req.user.currentSite
        };
        return errorUtil.resolve();
    }
    
    function validate() {
        if (!searchQuery._id || !validationUtil.isValidObjectId(searchQuery._id)) {
            return errorUtil.rejectWithUnprocessableRequestError('_id');
        }
        if (!clientData.firstName) {
            return errorUtil.rejectWithUnprocessableRequestError('firstName');
        }
        return errorUtil.resolve();
    }
    
    parseParams()
        .then(validate)
        .then(function() {
            return clientsSrvc.getClient(searchQuery);
        })
        .then(function(client) {
            if (!client) {
                return errorUtil.rejectWithObjectNotFoundError('client');
            }
            _.extend(client, clientData);
            client.lastEditedBy = req.user;
            return client;
        })
        .then(clientsSrvc.saveClient)
        .then(function(client) {
            return res.send(client);
        })
        .catch(function(err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};
