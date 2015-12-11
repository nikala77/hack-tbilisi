module.exports = function(app) {
	// dashboard controller
	var dashboard = require('../controllers/dashboard');

	// get dashboard
	app.route('/dashboard')
					  .get(dashboard.getDashboard);

	app.route('/dashboard/banner/new')
					  .get(dashboard.getBannerNew);
	
	app.route('/dashboard/banner/statistics')
					  .get(dashboard.getBannerStatistics);									 	

};