var _           = require('lodash');
var mongoose    = require('mongoose');
var encryption  = require('../util/encryption');
var Appointment = require('mongoose').model('appointment');

// TODO: test it
// TODO: rename getAppointments
exports.listAppointments = function(params, limit) {
    limit = limit || 50;
    
    return Appointment.find(params)
        // TODO: keys
        .select('appointmentTypeName status clients resources start end color textColor')
        .populate('clients', 'knownAs lastName name pic dob')
        .populate('resources', 'name')
        .limit(limit)
        .execAsync();
};

exports.getAppointments = function(params, keys) {
    var keysrefs = mongoose.splitKeysRefs(keys);
    var query = Appointment
        .find(params)
        .select(keysrefs.keys);
    
    _.each(keysrefs.refs, function(ref) {
        query = query.populate(ref.name, ref.keys);
    });
    
    return query.execAsync();
};

// TODO: test it
exports.getAppointment = function(params, keys) {
    var keysrefs = mongoose.splitKeysRefs(keys);
    var query = Appointment
        .findOne(params)
        .select(keysrefs.keys);
    
    _.each(keysrefs.refs, function(ref) {
        query = query.populate(ref.name, ref.keys);
    });
    
    return query.execAsync();
};

// TODO: delete
exports.getAppointmentUnpopulated = function(params) {
    return Appointment.findOneAsync(params);
};

// TODO: test it
exports.getHashedAppointment = function(params) {
    return Appointment
        .findOneAsync(params)
        .then(function(appointment) {
            var hashFields = Appointment.hashFields;
            return encryption.createHashedObject(appointment, hashFields);
        });
};

// TODO: test it
exports.getHashList = function(params) {
    return Appointment
        .find(params)
        .select('hash')
        .execAsync();
};

// TODO: test it
exports.createAppointment = function(appointmentData) {
    return Appointment.createAsync(appointmentData);
};

// TODO: test it
exports.saveAppointment = function(appointment) {
    return appointment
        .saveAsync()
        .spread(function(appointment) {
            return appointment;
        });
};

// TODO: test it
exports.deleteAppointment = function(appointment) {
    return appointment.removeAsync();
        // TODO: call from controller
        //.then(ical.updateIcals);
};
