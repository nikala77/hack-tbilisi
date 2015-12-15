module.exports = function(app) {
	// account controller
	var account = require('../controllers/account');
	var accountSrvc = require('../services/account');

	// get login form
	app.route('/login')
					  .get(accountSrvc.blockAuth, account.getLogin)
					  .post(accountSrvc.blockAuth, account.postLogin);

	app.route('/signup')
					  .get(accountSrvc.blockAuth, account.getSignUp)
					  .post(accountSrvc.blockAuth, account.postSignUp);

	app.route('/forgot')
					  .get(accountSrvc.blockAuth, account.getForgot)
					  .post(accountSrvc.blockAuth, account.postForgot);

	app.route('/reset/:token')
					  .get(accountSrvc.blockAuth, account.getReset);
};