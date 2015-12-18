var encryption = require('../util/encryption');

module.exports = function(resourceSchema) {
    var hashFields = resourceSchema.statics.hashFields;

    // TODO: test it
    resourceSchema.post('init', function() {
        this._original = this.toObject();
    });

    // TODO: test it
    resourceSchema.pre('save', true, function(next, done) {
        next();
        var resource = this;
        resource.hash = encryption.createObjectHash(resource, hashFields);

        resource.wasNew = resource.isNew;

        var fieldsToIgnore = ['site', 'hash', 'lastEditedBy'];
        var keys = Object.keys(resource._doc);
        resource.changedFields = keys.filter(function(key) {
            return resource.isModified(key) && fieldsToIgnore.indexOf(key) === -1;
        });

        done();
    });

    // TODO: test it
    resourceSchema.post('save', function(resource) {
        if (!resource.lastEditedBy) {
            return;
        }

        var sync = require('../util/sync');
        sync.writeToQueues('resource', resource.lastEditedBy, resource.changedFields, hashFields, resource._doc);
        // audit
        // todo: if (!resource.wasNew) audit.log(resource.lastEditedBy._id, resource.changedFields, resource._original);
    });
};
