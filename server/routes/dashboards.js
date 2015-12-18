var auth       = require('../controllers/auth');
var dashboards = require('../controllers/dashboards');

module.exports = function (app) {
    app.get('/api/dashboard/', auth.ensureAuthenticatedWrapper, dashboards.getDashboard);
    app.post('/api/dashboard/', auth.ensureAuthenticatedWrapper, dashboards.createDashboard);
    app.put('/api/dashboard/', auth.ensureAuthenticatedWrapper, dashboards.updateDashboard);
    app.delete('/api/dashboard/', auth.ensureAuthenticatedWrapper, dashboards.deleteDashboard);
    app.get('/api/dashboards/', auth.ensureAuthenticatedWrapper, dashboards.getDashboards);
};
