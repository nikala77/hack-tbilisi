exports.getEditor = function (req, res) {
	res.render('editor/editor.html', {
		pageName: 'Editor'
	});
};