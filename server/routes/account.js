module.exports = function(app) {
	// account controller
	var account = require('../controllers/account');
	var accountSrvc = require('../services/account');

	// get login form
	app.route('/login')
					  .get(accountSrvc.blockAuth, account.getLogin);

	app.route('/signup')
					  .get(accountSrvc.blockAuth, account.getSignUp);

	app.route('/forgot')
					  .get(accountSrvc.blockAuth, account.getForgot);

	app.route('/reset/:token')
					  .get(accountSrvc.blockAuth, account.getReset);
};