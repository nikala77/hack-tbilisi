var encryption = require('../util/encryption');

module.exports = function(clientSchema) {
    var hashFields = clientSchema.statics.hashFields;

    // TODO: test it
    clientSchema.post('init', function() {
        this._original = this.toObject();
    });

    // TODO: test it
    clientSchema.pre('save', true, function(next, done) {
        next();

        var client = this;
        client.hash = encryption.createObjectHash(client, hashFields);

        //save some stuff for post save hook
        client.wasNew = client.isNew;

        var fieldsToIgnore = ['site', 'hash', 'lastEditedBy', 'stats'];
        var keys = Object.keys(client._doc);
        client.changedFields = keys.filter(function(key) {
            return client.isModified(key) && fieldsToIgnore.indexOf(key) === -1;
        });

        done();
    });

    // TODO: test it
    clientSchema.post('save', function(client) {
        var sync = require('../util/sync');
        sync.writeToQueues('client', client.lastEditedBy, client.changedFields, hashFields, client._doc);
        // audit
        // todo: if (!client.wasNew) audit.log(client.lastEditedBy._id, client.changedFields, client._original);
    });
};
