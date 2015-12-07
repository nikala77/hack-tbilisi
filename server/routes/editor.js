module.exports = function (app) {
	var editor = require('../controllers/editor');

	app.route('/editor')
		.get(editor.getEditor);
};