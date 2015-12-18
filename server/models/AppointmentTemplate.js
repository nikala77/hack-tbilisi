var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var appointmentTemplateSchema = new Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'resource',
        required: true
    }],
    color: {
        type: String,
        default: '#39CCCC'
    },
    textColor: {
        type: String,
        default: 'black'
    },
    duration: {
        type: Number,
        default: 10
    }
});

require('../models/AppointmentTemplateMiddleware')(appointmentTemplateSchema);
mongoose.model('appointmentTemplate', appointmentTemplateSchema);

exports.appointmentTemplateSchema = appointmentTemplateSchema;
