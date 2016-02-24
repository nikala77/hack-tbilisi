module.exports = function(app) {
	// dashboard controller
	var accountSrvc = require('../services/account');
	var dashboard = require('../controllers/dashboard');

	// get dashboard
	app.route('/dashboard')
					  .get(accountSrvc.isAuthenticated, dashboard.getDashboard);

	app.route('/dashboard/banner/new')
					  .get(accountSrvc.isAuthenticated, dashboard.getBannerNew);
	
	app.route('/dashboard/banner/statistics')
					  .get(accountSrvc.isAuthenticated, dashboard.getBannerStatistics);
	

	// API routes
	app.route('/api/banner/new')
				.post(dashboard.createBanner);

	app.route('/api/banner/delete/:id')
				.delete(dashboard.deleteBanner);

};