var auth                = require('../controllers/auth');
var resourceWeekAvTimes = require('../controllers/resourceWeekAvTimes');

module.exports = function (app) {
    app.get('/api/resourceWeekAvTimes', auth.ensureAuthenticatedWrapper, resourceWeekAvTimes.getResourceWeekAvTimes);
    app.post('/api/resourceWeekAvTimes', auth.ensureAuthenticatedWrapper, resourceWeekAvTimes.saveResourceWeekAvTimes);
    app.post('/api/resourceWeekAvTimes/clone', auth.ensureAuthenticatedWrapper, resourceWeekAvTimes.cloneResourceWeekAvTimes);
};
