var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var resourceSchema = new Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
        required: true,
        index: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    status: { // Active, Inactive
        type: String,
        default: 'Active'
    },
    practitioner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        index: true
    },
    appointmentInterval: {
        type: Number,
        required: true,
        default: 10
    },
    pic: String,
    hash: String,
    lastEditedBy: {
        type: {},
        select: false
    },
    regions: [{
        _id: false,
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        bgColor: {
            type: String,
            required: true
        },
        appointmentTemplates: [{
            type: Schema.Types.ObjectId,
            ref: 'template'
        }]
    }]
}, {
    id: false
});

resourceSchema.index({
    site: 1,
    name: 1
});

var hashFields = ['name', 'status'];
resourceSchema.statics.hashFields = hashFields;

require('../models/ResourceMiddleware')(resourceSchema);
mongoose.model('resource', resourceSchema);

exports.resourceSchema = resourceSchema;
