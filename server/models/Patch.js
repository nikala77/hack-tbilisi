var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var patchSchema = exports.patchSchema = new Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
        require: '{PATH} is required', // TODO: fix to required
        index: true
    },
    apiUser: Schema.Types.ObjectId,
    collectionName: String,
    /* jshint camelcase: false */
    collection_id: Schema.Types.ObjectId,
    created: {
        type: Date,
        required: true,
        default: Date.now(),
        expires: '7d'
    },
    patch: String
});

mongoose.model('patch', patchSchema);
