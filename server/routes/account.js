module.exports = function(app) {
	// account controller
	var account = require('../controllers/account');

	// get login form
	app.route('/login')
					  .get(account.getLogin);

	app.route('/signup')
					  .get(account.getSignUp);

	app.route('/forgot')
					  .get(account.getForgot);

	app.route('/reset/:token')
					  .get(account.getReset);
};