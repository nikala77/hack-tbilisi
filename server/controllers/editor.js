var mongoose = require('mongoose');
var Promise  = require('bluebird');
var Banner   = mongoose.model('Banner');
var httpUtil  = require('../util/httpUtil');


exports.getEditor = function (req, res, next) {
	Promise.resolve(Banner.findById(req.params.id))
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