var app 	 = require('../../server/app');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var testUtil = {

	createUser: function(done) {
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

	
};

module.exports = testUtil;