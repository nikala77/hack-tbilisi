module.exports = function(app) {
	// follower controller
	var follower = require('../controllers/follower');

	// add follower
	app.route('/api/follower')
						 .post(follower.addFollower);

};