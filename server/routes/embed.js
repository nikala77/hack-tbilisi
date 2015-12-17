module.exports = function (app) {
	var embed = require('../controllers/embed');

	// return fixed banner html 
	app.route('/embed/fixed/:id/:width/:height')
		.get(embed.getFixed);

	// return responsive banner html
	app.route('/embed/responsive/:id/:width/:height')
		.get(embed.getResponsive)

};