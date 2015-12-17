var mongoose = require('mongoose');
var Promise  = require('bluebird');
var Banner   = mongoose.model('Banner');
var httpUtil  = require('../util/httpUtil');


exports.getEditor = function (req, res, next) {
	Promise.resolve(Banner.findById(req.params.id, { 'data': 0 }))
	.then(function(banner) {
		if(!banner) {
			return Promise.reject();
		}

		return res.render('editor/editor.html', {
			pageName: 'Editor',
			banner: banner
		});
	})
	.catch(function(err) {
		return httpUtil.processError(err, 'json', res, next);
	});
};

exports.getBannerData = function(req, res, next) {
	Promise.resolve(Banner.findById(req.params.id))
	.then(function(banner) {
		if(!banner) {
			return Promise.reject();
		}
		res.json(banner.data);
	})
	.catch(function(err) {
		return httpUtil.processError(err, 'json', res, next);
	});
};

exports.updateBannerData = function(req, res, next) {
	var data = req.body.data;
	
	Promise.resolve(Banner.findById(req.params.id))
	.then(function(banner) {
		if(!banner) {
			return Promise.reject();
		}

		banner.data = data;
		banner.updatedAt = new Date();
		return banner.save();
	})
	.then(function(status) {
		res.send('Saved Successfully');
	})
	.catch(function(err) {
		return httpUtil.processError(err, 'json', res, next);
	});
};

exports.updateBannerName = function (req, res, next) {

	Promise.resolve(Banner.findById(req.params.id))
	.then(function(banner) {
		if(!banner) {
			return Promise.reject();
		}

		banner.name = req.body.name;
		banner.updatedAt = new Date();
		return banner.save();
	})
	.then(function(status) {
		res.send('Saved Successfully');
	})
	.catch(function(err) {
		return httpUtil.processError(err, 'json', res, next);
	});
}