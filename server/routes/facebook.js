module.exports = function(app, passport) {

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook', { scope: [ 'email' ] }));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
				successRedirect : '/dashboard',
				failureRedirect : '/login'
			}));

	// route for logging out
	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/login');
		});
};