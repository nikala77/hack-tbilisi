var auth    = require('../controllers/auth');
var clients = require('../controllers/clients');

module.exports = function (app) {
    app.get('/api/clients/hash/:_id', auth.ensureAuthenticatedWrapper, clients.getHashedClientById);
    app.get('/api/clients/hashlist', auth.ensureAuthenticatedWrapper, clients.getHashList);
    app.get('/api/clients/search', auth.ensureAuthenticatedWrapper, clients.searchClients);
    app.get('/api/clients/:_id', auth.ensureAuthenticatedWrapper, clients.getClientById);
    app.get('/api/clients', auth.ensureAuthenticatedWrapper, clients.listClients);
    app.post('/api/clients/:_id', auth.ensureAuthenticatedWrapper, clients.updateClient);
    app.post('/api/clients', auth.ensureAuthenticatedWrapper, clients.createClient);
};
