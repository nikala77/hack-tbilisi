var account = require('../services/account');

module.exports = function(app) {
	// dashboard controller
	var dashboard = require('../controllers/dashboard');

	// get dashboard
	app.route('/dashboard')
					  .get(account.isAuthenticated, dashboard.getDashboard);

	app.route('/dashboard/banner/new')
					  .get(account.isAuthenticated, dashboard.getBannerNew);
	
	app.route('/dashboard/banner/statistics')
					  .get(account.isAuthenticated, dashboard.getBannerStatistics);									 	

};