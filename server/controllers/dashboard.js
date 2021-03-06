var mongoose  = require('mongoose');
var User 	  = mongoose.model('User');
var Banner 	  = mongoose.model('Banner');
var Promise   = require('bluebird');
var Q 		  = require('q');
var errorUtil = require('../util/errorUtil');
var httpUtil  = require('../util/httpUtil');


exports.getDashboard = function(req, res) {
	// API get all banners by user ID
	Promise.resolve(Banner.find({ userID: req.user.id },
	{ 'name': 1, 'data': 1, 'createdAt': 1 }).sort({ updatedAt: -1 }))
	.then(function(banners) {
		res.render('dashboard/banners.html', {
			pageName	: 'Bannermaker',
			user 		: req.user,
			banners 	: banners,
		});
	})
	.catch(function(err) {
		httpUtil.processError(err, 'json', res, next);
	});
};

exports.getBannerNew = function(req, res) {
	Promise.resolve(Banner.count({ userID: req.user.id }))
	.then(function(count) {
		var banners = new Array(count);
		res.render('dashboard/banners.html', {
			pageName	: 'Bannermaker',
			user 		: req.user,
			banners 	: banners
		});
	})
	.catch(function(err) {
		httpUtil.processError(err, 'json', res, next);
	});
};

exports.getBannerStatistics = function(req, res) {
	var total;
	var deferred = Q.defer();

	Banner.aggregate([
		{ 
			$match: { 
				userID: mongoose.Types.ObjectId(req.user.id) 
			} 
		},
		{ 
			$group: {
				_id: '$userID',
				clicks: { $sum: '$clicks' },
				views:  { $sum: '$views' },
				count:  { $sum: 1 }
			}
		}
	], function(err, data) {
		if(err) {
			deferred.reject(err);
		}

		deferred.resolve(data);
	})

	deferred.promise
	.then(function(data) {
		total = data[0];

		return Promise.resolve(Banner.find({ userID: req.user.id }, 
			{ 'name': 1, 'createdAt': 1, 'updatedAt': 1, 'views': 1, 'clicks': 1 })
			.sort({ updatedAt: -1 }));
	})
	.then(function(banners) {
		res.render('dashboard/banners.html', {
			pageName	: 'Bannermaker',
			user 		: req.user,
			banners 	: banners,
			total		: total
		});
	})
	.catch(function(err) {
		httpUtil.processError(err, 'json', res, next);
	});
};

// API save new banner
exports.createBanner = function(req, res, next) {
	var banner = req.body;
	var name = banner.name;
	var width = banner.width;
	var height = banner.height;

	function validateParams() {
		try {
			banner.userID = mongoose.Types.ObjectId(banner.userID);
			return Promise.resolve();
		} catch(err) {
			return errorUtil.rejectWithObjectInvalidError('Provided UserID is not valid');
		}
	}

	validateParams()
	.then(function() {
		if(!name || !width || !height) {
			return errorUtil.rejectWithObjectInvalidError('Banner name, width or height is not defined');
		}
		return errorUtil.resolve();
	})
	.then(function() {
		return User.findById(banner.userID).exec();
	})
	.then(function(data) {
		if(!data) {
			return errorUtil.rejectWithObjectNotFoundError('User with this ID');
		}
		return new Banner(banner).save();
	})
	.then(function(data) {
		return res.status(301).send(data._id);
	})
	.catch(function(err) {
		return httpUtil.processError(err, 'json', res, next);
	});
};

exports.deleteBanner = function(req, res, next) {
	var id = req.params.id;

	Promise.resolve(Banner.remove({ _id: id }))
	.then(function(data) {
		return res.status(200).send({ 'message': 'Banner has successfully deleted!' });
	})
	.catch(function(err) {
		return httpUtil.processError(err, 'json', res, next);
	})
};