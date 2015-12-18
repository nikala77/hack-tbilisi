var auth     = require('../controllers/auth');
var messages = require('../controllers/messages');

module.exports = function (app) {
    app.post('/api/messages/client/:_id', auth.ensureAuthenticated, messages.sendSmsToClient);
    app.post('/api/messages/smsical/client/:_id', auth.ensureAuthenticated, messages.smsIcalToClient);
};
