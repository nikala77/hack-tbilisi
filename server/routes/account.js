module.exports = function(app) {
	// account controller
	var account = require('../controllers/account');

	// get login form
	app.route('/login')
					  .get(account.getLogin);

};