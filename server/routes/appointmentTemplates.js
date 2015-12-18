var auth                 = require('../controllers/auth');
var appointmentTemplates = require('../controllers/appointmentTemplates');

module.exports = function (app) {
    app.get('/api/appointmentTemplates/:_id', auth.ensureAuthenticatedWrapper, appointmentTemplates.getAppointmentTemplateById);
    app.get('/api/appointmentTemplates', auth.ensureAuthenticatedWrapper, appointmentTemplates.getAppointmentTemplates);
    app.post('/api/appointmentTemplates/:_id', auth.ensureAuthenticatedWrapper, appointmentTemplates.updateAppointmentTemplates);
    app.post('/api/appointmentTemplates', auth.ensureAuthenticatedWrapper, appointmentTemplates.createAppointmentTemplate);
};
