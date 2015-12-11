module.exports = function(app, passport) {

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook'));

	app.route('/auth/facebook/callback')
		.get(function() {
				passport.authenticate('facebook', {
				successRedirect : 'http://localhost:5001/dashboard',
				failureRedirect : 'http://localhost:5001/'
			})
		});

	// route for logging out
	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/');
		});
};