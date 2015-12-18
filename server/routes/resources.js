var auth      = require('../controllers/auth');
var resources = require('../controllers/resources');

module.exports = function (app) {
    app.get('/api/resources', auth.ensureAuthenticatedWrapper, resources.getResources);
    app.get('/api/resources/hashlist', auth.ensureAuthenticatedWrapper, resources.getHashList);
    app.get('/api/resources/:_id', auth.ensureAuthenticatedWrapper, resources.getResourceById);
    app.post('/api/resources/:_id', auth.ensureAuthenticatedWrapper, resources.updateResource);
    app.post('/api/resources/:_id/regions', auth.ensureAuthenticatedWrapper, resources.updateResourceRegions);
    app.post('/api/resources', auth.ensureAuthenticatedWrapper, resources.createResource);
    app.delete('/api/resources/:_id', auth.requireRolesWrapper(['owner', 'manager', 'api']), resources.deleteResource);
};
