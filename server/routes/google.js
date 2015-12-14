module.exports = function(app, passport) {

	app.route('/auth/google')
		.get(passport.authenticate('google', { scope: [ 'email' ] }));

	app.route('/auth/google/callback')
		.get(passport.authenticate('google', {
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