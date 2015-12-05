var mongoose 	 = require('mongoose');
var followerSrvc = require('../services/follower');
var	follower 	 = mongoose.model('Follower');
var httpUtil	 = require('../util/httpUtil');

exports.getFollowers = function(req, res) {
	follower.find({}).exec(function(err, data) {
		if(err) {
			console.log(err);
			return res.status(500).send(err);
		}
		return res.json(data);
	});
};

exports.addFollower = function(req, res, next) {
	followerSrvc.addFolower(req.body)
	.then(function(data) {
		return res.json(data);
	})
	.catch(function(err) {
		return httpUtil.processError(err, 'json', res, next);
	});
};