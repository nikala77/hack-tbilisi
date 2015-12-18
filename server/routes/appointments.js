var auth         = require('../controllers/auth');
var appointments = require('../controllers/appointments');

module.exports = function (app) {
    app.get('/api/appointments/hashlist', auth.ensureAuthenticatedWrapper, appointments.getHashList);
    app.get('/api/appointments/:_id', auth.ensureAuthenticatedWrapper, appointments.getAppointmentById);
    app.get('/api/appointments', auth.ensureAuthenticatedWrapper, appointments.getAppointments);
    app.post('/api/appointments/:_id', auth.ensureAuthenticatedWrapper, appointments.updateAppointment);
    app.post('/api/appointments/:_id/dates', auth.ensureAuthenticatedWrapper, appointments.updateAppointmentDates);
    app.post('/api/appointments', auth.ensureAuthenticatedWrapper, appointments.createAppointment);
};
