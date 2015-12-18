var sanitize    = require('./sanitize');
var aws         = require('./aws');
var usersSrvc   = require('../services/users');
var patchesSrvc = require('../services/patches');

// TODO: test it
exports.writeToQueues = function(dataType, lastEditedBy, changedFields, hashFields, doc) {
    // console.log('changedFields: ' + changedFields);
    var patchFields = changedFields.filter(function(changedField) {
        return hashFields.indexOf(changedField) > -1;
    });
    if (patchFields.indexOf('_id') === -1) {
        patchFields.push('_id');
    }

    // console.log('patchfields: ' + patchFields);
    // console.log('doc: ' + JSON.stringify(doc));
    // console.log('lastEditedBy: ' + JSON.stringify(lastEditedBy));

    return sanitize.sanitizeData(doc, patchFields)
        .then(function(patch) {
            var params = {
                'siteRoles.site': lastEditedBy.currentSite,
                'siteRoles.roles': 'api'
            };
            // console.log('params: ' + JSON.stringify(params));
            return usersSrvc.getUsers(params)
                .then(function(apiUsers) {
                    apiUsers.forEach(function(apiUser) {
                        // don't update the user that just updated!
                        if (apiUser._id.toString() !== lastEditedBy._id) {
                            return savePatch(apiUser._id, patch)
                                .then(notifyQueue);
                        }
                    });
                });
        });

    function savePatch(apiUser, patch) {
        var patchData = {
            site: lastEditedBy.currentSite,
            apiUser: apiUser,
            collectionName: dataType,
            patch: JSON.stringify(patch)
        };
        return patchesSrvc.createPatch(patchData);
    }

    function notifyQueue(patch) {
        var queueName = 'sync_' + patch.apiUser + '_' + patch.collectionName;
        var message = 'check patches!'; // no message actually required
        return aws.createQueue(queueName)
            .then(function(url) {
                return aws.retrieveQueueMessages(url)
                    .then(function(messages) {
                        // unfortunately, if called in quick succession, this may come back 
                        // empty even after messages posted :(
                        if (!messages || messages.length === 0) {
                            return aws.addQueueMessage(url, message);
                        }
                        return;
                    });
            });
    }
};