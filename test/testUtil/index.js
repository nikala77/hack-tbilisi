var app 	 = require('../../server/app');
var Promise	 = require('bluebird');
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
		
	},

	createBanner: function(id) {
		return new Banner({ 
					userID: id,
					name: 'myBanner',
					width: 728,
					height: 90
				}).save();

	}

	
};

module.exports = testUtil;