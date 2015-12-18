var auth  = require('../controllers/auth');
var sites = require('../controllers/sites');

module.exports = function (app) {
    app.get('/api/sites', auth.ensureAuthenticatedWrapper, sites.getSites);
    app.get('/api/sites/:_id', auth.requireRolesWrapper(['owner']), sites.getUserById);
    app.put('/api/sites/:_id', auth.requireRolesWrapper('owner'), sites.updateSite);
    app.post('/api/sites', auth.ensureAuthenticatedWrapper, sites.createSite);
    app.delete('/api/sites/:_id', auth.requireRolesWrapper('owner'), sites.deleteSite);
};
