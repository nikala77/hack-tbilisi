var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var appointmentSchema = new Schema({
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
    appointmentTypeName: {
        type: String,
        required: true,
        index: true
    },
    appointmentTemplate: {
        type: Schema.Types.ObjectId,
        ref: 'appointmentTemplate',
        index: true
    },
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'client',
        index: true
    }],
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'resource',
        index: true
    }],
    status: { // pending, cancelled, fulfilled
        type: String,
        default: 'pending',
        index: true
    },
    start: {
        type: Date,
        required: true,
        index: true
    },
    end: {
        type: Date,
        required: true,
        index: true
    },
    duration: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        default: '#39CCCC'
    },
    textColor: {
        type: String,
        default: 'black'
    },
    note: {
        type: String
    },
    // TODO: why?
    allDay: {
        type: Boolean,
        default: false
    },
    hash: String,
    lastEditedBy: {
        type: {},
        select: false
    }
}, {
    id: false
});

var hashFields = ['appointmentTypeName', 'clients', 'resources', 'start', 'end', 'status'];
appointmentSchema.statics.hashFields = hashFields;

require('../models/AppointmentMiddleware')(appointmentSchema);
mongoose.model('appointment', appointmentSchema);

exports.appointmentSchema = appointmentSchema;
