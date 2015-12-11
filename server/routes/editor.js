var account = require('../services/account');

module.exports = function (app) {
	var editor = require('../controllers/editor');

	app.route('/editor')
		.get(account.isAuthenticated, editor.getEditor);
};