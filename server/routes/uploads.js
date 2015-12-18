var auth    = require('../controllers/auth');
var uploads = require('../controllers/uploads');

module.exports = function (app) {
    app.post('/api/uploads/upload', auth.ensureAuthenticated, uploads.uploadPic);
    app.post('/api/uploads/copy', auth.ensureAuthenticated, uploads.copyPic);
};
