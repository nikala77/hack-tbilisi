var auth   		= require('../controllers/auth');
var aws    		= require('../controllers/aws');
var userEcho	= require('../controllers/userEcho');
var tokens 		= require('../controllers/tokens');

module.exports = function (app) {
    app.get('/api/token/getSignedUrl', auth.ensureAuthenticated, aws.getSignedUrl);
    app.get('/api/token/getTemporaryCredentials', auth.ensureAuthenticated, aws.getTemporaryCredentials);
    app.get('/api/token/getTemporaryCredentialsSync', auth.ensureAuthenticated, aws.getTemporaryCredentialsSync);
    app.get('/api/token/getUserEcho',  userEcho.getToken);
    app.get('/api/token/:tokenId', tokens.handleToken);
};
