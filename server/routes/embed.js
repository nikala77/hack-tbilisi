module.exports = function (app) {
	var embed = require('../controllers/embed');

	// return fixed banner html 
	app.route('/embed/fixed/:id')
		.get(embed.getFixed);

	// return responsive banner html
	app.route('/embed/responsive/:id')
		.get(embed.getResponsive)

};