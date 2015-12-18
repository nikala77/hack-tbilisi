var _                   = require('lodash');
var mongoose            = require('mongoose');
var appointmentsSrvc    = require('../services/appointments');
var Appointment         = require('mongoose').model('appointment');
var AppointmentTemplate = require('mongoose').model('appointmentTemplate');

// TODO: test it
exports.getAppointmentTemplate = function(params, keys) {
    var keysrefs = mongoose.splitKeysRefs(keys);
    var query = AppointmentTemplate
        .findOne(params)
        .select(keysrefs.keys);
    
    _.each(keysrefs.refs, function(ref) {
        query = query.populate(ref.name, ref.keys);
    });
    
    return query.execAsync();
};

// TODO: test it
exports.getAppointmentTemplates = function(params, keys) {
    var keysrefs = mongoose.splitKeysRefs(keys);
    var query = AppointmentTemplate
        .find(params)
        .select(keysrefs.keys)
        .sort('name');
    
    _.each(keysrefs.refs, function(ref) {
        query = query.populate(ref.name, ref.keys);
    });
    
    return query.execAsync();
};

// TODO: test it
exports.createAppointmentTemplate = function(atData) {
    return AppointmentTemplate.createAsync(atData);
};

// TODO: test it
exports.saveAppointmentTemplate = function(at) {
    return at
        .saveAsync()
        .spread(function(at) {
            return at;
        });
};

// TODO: test it
// TODO: doesn't used
exports.deleteAppointmentTemplate = function(at) {
    return appointmentsSrvc
        .getAppointments({
            appointmentTemplate: at
        })
        .map(function(appointment) {
            return Appointment.updateAsync(
                {
                    _id: appointment._id
                }, 
                {
                    $unset: {
                        appointmentTemplate: 1
                    }
                }
            );
    })
    .then(function() {
        return at.removeAsync();
    });
};
