exports.getDashboard = function(req, res) {
	res.render('dashboard/banners.html', {
		user 		: req.user,
		pageName	: 'hack15',
	});
};

exports.getBannerNew = function(req, res) {
	res.render('dashboard/banners.html', {
		user 		: req.user,
		pageName	: 'hack15',
	});
};

exports.getBannerStatistics = function(req, res) {
	res.render('dashboard/banners.html', {
		user 		: req.user,
		pageName	: 'hack15',
	});
};