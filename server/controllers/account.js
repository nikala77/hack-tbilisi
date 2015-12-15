var mongoose 	 = require('mongoose'),
    passport     = require('passport'),
    validator    = require('validator'),
    crypto       = require('crypto'),
    nodemailer   = require('nodemailer'),
    Promise      = require('promise');

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

exports.postForgot = function(req, res) {

    var getToken = function () {
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                return resolve(token);
            }); 
        });
    };   

    getToken().then(function (token) {
        return User.findOne({ 'local.email': req.body.email }, function(err, user) {
            if (!user) {
                return res.status(200).json({message: 'No account with that email address exists.'});
            }
            user.local.resetPasswordToken = token;
            user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
                if (err)
                    console.log(err);
                return  user;
            });
        });
    }).then(function (user) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'gmail',
            auth: {
                user: 'ggola93@gmail.com',
                pass: '571212223'
            }
        });
        var mailOptions = {
            to: user.local.email,
            from: 'hack15@project.com',
            subject: 'hack15 Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + user.local.resetPasswordToken + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            if (err) {
                console.log(err)
                return res.status(404).json({ message: 'senging mail failed, please try later!' })
            }
            return res.status(200).json({ message: 'An e-mail has been sent to ' + user.local.email + ' with further instructions.' });
            
        });
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
