var app 	 = require('../../server/app');
var mongoose = require('mongoose');

var User 	 = mongoose.model('User');
var Banner 	 = mongoose.model('Banner');

var testUtil = {

	createUser: function(done) {
		User.collection.drop();
		Banner.collection.drop();

		var user = new User({
			'local.email': 'kakhidze2012@gmail.com',
			'local.password': 'acmilan'
		});

		user.save(function(err) {
			if(err) {
				throw err;
			}
			done();
		});
	},

	deleteUser: function(done) {
		User.collection.drop();
		Banner.collection.drop();
		done();
	},

	createUserWithToken: function(done) {
		var user = new User({
			'local.email': 'kakhidze2012@gmail.com',
			'local.password': 'acmilan',
			'local.resetPasswordToken': 'test-token',
			'local.resetPasswordExpires': Date.now() + 3600
		});

		user.save(function(err) {
			if(err) {
				throw err;
			}
			done();
		});
	},

	logIn: function(user) {
		
	}

	
};

module.exports = testUtil;