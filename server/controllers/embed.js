exports.getFixed = function(req, res) {
	var id = req.params.id;
	var baseURL = req.protocol + '://' + req.get('host');

	res.render('embed/fixed-source', {
		id: id,
		host: baseURL,
	});
};

exports.getResponsive = function(req, res) {
	res.render('embed/responsive-source', {});
};