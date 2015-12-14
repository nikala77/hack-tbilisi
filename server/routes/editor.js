
module.exports = function (app) {
	var account = require('../services/account');
	var editor = require('../controllers/editor');

	app.route('/editor/:id')
		.get(account.isAuthenticated, editor.getEditor);

	// API for editor
	app.route('/api/banner/data/:id')
		.get(editor.getBannerData)
		.put(editor.updateBannerData);

};