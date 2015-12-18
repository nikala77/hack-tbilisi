var encryption = require('../util/encryption');

module.exports = function(appointmentSchema) {
    var hashFields = appointmentSchema.statics.hashFields;

    appointmentSchema.post('init', function() {
        this._original = this.toObject();
    });

    appointmentSchema.pre('save', true, function(next, done) {
        next();
        var appointment = this;
        appointment.hash = encryption.createObjectHash(appointment, hashFields);

        appointment.wasNew = appointment.isNew;

        var fieldsToIgnore = ['site', 'hash', 'lastEditedBy'];
        var keys = Object.keys(appointment._doc);
        appointment.changedFields = keys.filter(function(key) {
            return appointment.isModified(key) && fieldsToIgnore.indexOf(key) === -1;
        });

        done();
    });

    appointmentSchema.post('save', function(appointment) {
        if (!appointment.lastEditedBy) {
            return;
        }

        var appointmentsSrvc = require('../services/appointments');
        return appointmentsSrvc
            .getAppointment({
                _id: appointment._id
            })
            .then(function(populatedAppointment) {
                var sync = require('../util/sync');
                sync.writeToQueues('appointment', appointment.lastEditedBy, appointment.changedFields, hashFields, populatedAppointment._doc);
                // audit
                // todo: if (!appointment.wasNew) audit.log(appointment.lastEditedBy._id, appointment.changedFields, appointment._original);
            });
    });
};
