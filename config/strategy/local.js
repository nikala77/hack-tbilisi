var mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');

module.exports = function(passport) {

	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


	passport.use(new LocalStrategy({
    	usernameField: 'email',
  	},function(email, password, done){
		User.findOne({ 'local.email': email }, function(err, user) {
			if (err) return done(err);
			
			if (!user) return done(null, false, { message: 'Incorrect email.' });
			
			user.comparePassword(password, function(err, isMatch) {
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Incorrect password.' });
				}
			});
		});
	}));
};