var mongoose 	 = require('mongoose');

var User = require('../models/user');
// var httpUtil	 = require('../util/httpUtil');

exports.getLogin = function(req, res) {
	res.render('account/login.html', {
        pageName: 'hack15'
    });
};

exports.postLogin = function (req, res, next) {
    console.log('req.body on login', req.body);

    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err)
        if (!user) {
            return res.redirect('/login')
        }
        req.logIn(user, function(err) {
        if (err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
}

exports.getSignUp = function(req, res) {
	res.render('account/signup.html', {
        pageName: 'hack15'
    });
};

exports.postSignUp = function(req, res) {
    console.log('req.body on signup', req.body);
    var user = new User({
        'local.email': req.body.email,
        'local.password': req.body.password
    });

    user.save(function(err) {
        console.log('saveddd', user);
        if (err)
            console.log(err);
        // req.logIn(user, function(err) {
        //     res.redirect('/');
        // });
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

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/login');
}
