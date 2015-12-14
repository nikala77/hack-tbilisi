// var mongoose 	 = require('mongoose');
// var httpUtil	 = require('../util/httpUtil');

exports.getLogin = function(req, res) {
	res.render('account/login.html', {
        pageName: 'hack15'
    });
};

exports.getSignUp = function(req, res) {
	res.render('account/signup.html', {
        pageName: 'hack15'
    });
};

exports.getForgot = function(req, res) {
	res.render('account/forgot.html', {
        pageName: 'hack15'
    });
};

exports.getReset = function(req, res) {
	res.render('account/reset.html', {
        pageName: 'hack15'
    });
};

