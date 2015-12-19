var mongoose 	 = require('mongoose');
var Banner 	  = mongoose.model('Banner');
var Promise   = require('bluebird');
var errorUtil = require('../util/errorUtil');
var httpUtil  = require('../util/httpUtil');


exports.getFixed = function(req, res) {
	var id = req.params.id;
	var width = req.params.width;
	var height = req.params.height;

	var baseURL = req.protocol + '://' + req.get('host');

	Promise.resolve(Banner.findById(id).select('url'))
	.then(function(result) {
		res.render('embed/fixed-source', {
			id: id,
			host: baseURL,
			width: width,
			height: height,
			url: result.url
		});
	})
	.catch(function(err) {
		httpUtil.processError(err, 'json', res, next);
	});

};

exports.getResponsive = function(req, res) {
	var id = req.params.id;
	var width = req.params.width;
	var height = req.params.height;

	var baseURL = req.protocol + '://' + req.get('host');

	Promise.resolve(Banner.findById(id).select('url'))
	.then(function(result) {
		res.render('embed/responsive-source', {
			id: id,
			host: baseURL,
			width: width,
			height: height,
			url: result.url
		});
	})
	.catch(function(err) {
		httpUtil.processError(err, 'json', res, next);
	});
	
};

exports.incViews = function(req, res) {
	var id = req.params.id;

	Promise.resolve(Banner.update({ _id: id }, { $inc: { views: 1 }}))
	.then(function(result) {
		res.send('incremented');
	})
	.catch(function(err) {
		httpUtil.processError(err, 'json', res, next);
	});
};

exports.incClicks = function(req, res) {
	var id = req.params.id;
	
	Promise.resolve(Banner.update({ _id: id }, { $inc: { clicks: 1 }}))
	.then(function(result) {
		res.send('incremented');
	})
	.catch(function(err) {
		httpUtil.processError(err, 'json', res, next);
	});
};