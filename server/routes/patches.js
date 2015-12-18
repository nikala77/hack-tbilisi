var auth    = require('../controllers/auth');
var patches = require('../controllers/patches');

module.exports = function (app) {
    app.get('/api/patches/:collectionName', auth.requireRoles(['api']), patches.getPatches);
    app.delete('/api/patches/:_id', auth.requireRoles(['api']), patches.deletePatch);
};
