var mongoose 	 = require('mongoose'),
    passport     = require('passport'),
    validator    = require('validator'),
    crypto       = require('crypto'),
    nodemailer   = require('nodemailer'),
    emailConf    = require('../../config/env/development').email,
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

    var getUser = function (token) {
        return new Promise(function (resolve, reject) {
            User.findOne({ 'local.email': req.body.email }, function (err, user) {
                if (!user) {
                    return res.status(200).json({message: 'No account with that email address exists.'});
                }
                user.local.resetPasswordToken = token;
                user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    if (err)
                        console.log(err);
                    return  resolve(user);
                });
            });
        });    
    };   

    var sendMail = function (user) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'gmail',
            auth: {
                user: emailConf.user,
                pass: emailConf.pass
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
    }

    getToken()
        .then(function (token) {
            return getUser(token);
        })
        .then(function (user) {
            sendMail(user);
        });
};

exports.getReset = function(req, res) {
    User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            return res.status(404).json({message: 'Password reset token is invalid or has expired!'});
        }
        res.render('account/reset.html', {
            pageName: 'hack15'
        });
    });
};

exports.postReset = function (req, res) {
    var getUser = function () {
        return new Promise(function (resolve, reject) {
            User.findOne({ 'local.resetPasswordToken': req.params.token , 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    return res.status(404).json({message: 'Password reset token is invalid or has expired!'});
                }

                user.local.password = req.body.password;
                user.local.resetPasswordToken = undefined;
                user.local.resetPasswordExpires = undefined;    
                
                user.save(function(err) {
                    if (err)
                        console.log(err);
                    return  resolve(user);
                });
            });
        });
    };   

    getUser().then(function (user) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'gmail',
            auth: {
                user: emailConf.user,
                pass: emailConf.pass
            }
        });
        var mailOptions = {
            to: user.local.email,
            from: 'hack15@project.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            if (err) {
                console.log(err)
                return res.status(404).json({ message: 'senging mail failed, please try later!' })
            }
            return res.status(200).json({ message: 'Your password has just been changed!' });
        });
    });
}
exports.logout = function (req, res) {
    req.session.destroy()
    req.logout();
    res.redirect('/login');
}
