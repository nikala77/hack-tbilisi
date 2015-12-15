var mongoose 	 = require('mongoose'),
    passport     = require('passport'),
    validator    = require('validator');

var User = mongoose.model('User');
// var httpUtil	 = require('../util/httpUtil');

exports.getLogin = function(req, res) {
	res.render('account/login.html', {
        pageName: 'hack15'
    });
};

exports.postLogin = function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err)
        if (!user) {
            return res.status(404).json(info);
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            
            return res.status(200).json({success: true});
        });
    })(req, res, next);
}

exports.getSignUp = function(req, res) {
	res.render('account/signup.html', {
        pageName: 'hack15'
    });
};

exports.postSignUp = function(req, res) {
    if (!validator.isEmail(req.body.email)) 
        return res.status(404).json({message: 'Please enter valid email!'});
    else if (req.body.password.length < 6) 
        return res.status(404).json({message: 'Password must contain at least 6 symbol!'});


    var user = new User({
        'local.email': req.body.email,
        'local.password': req.body.password
    });

    user.save(function(err) {
        if (err)
            console.log(err);
        res.status(200).json({message: 'Succesfully registered!'});
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
    req.session.destroy()
    req.logout();
    res.redirect('/login');
}
