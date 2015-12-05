module.exports = function(app) {
	// user controller
	var user = require('../controllers/user');

	// create user
	app.route('/api/user')
						 .post(user.createUser);

	app.route('/api/authenticate')
						 .post(user.authenticateUser);

};