var mongoose 	 = require('mongoose');
var path 		 = require('path');
var httpUtil	 = require('../util/httpUtil');

exports.getLogin = function(req, res) {
	res.render(path.join('../views/', '/account/login.html'), {
        pageName: 'hack15'
    });
};