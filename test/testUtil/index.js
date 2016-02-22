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
	}

};

module.exports = testUtil;