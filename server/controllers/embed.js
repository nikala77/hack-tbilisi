exports.getFixed = function(req, res) {
	var id = req.params.id;
	var width = req.params.width;
	var height = req.params.height;

	var baseURL = req.protocol + '://' + req.get('host');

	res.render('embed/fixed-source', {
		id: id,
		host: baseURL,
		width: width,
		height: height
	});
};

exports.getResponsive = function(req, res) {
	var id = req.params.id;
	var width = req.params.width;
	var height = req.params.height;

	var baseURL = req.protocol + '://' + req.get('host');

	res.render('embed/responsive-source', {
		id: id,
		host: baseURL,
		width: width,
		height: height
	});
};