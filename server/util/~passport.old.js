/*
var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Promise = require('bluebird'),
    usersSrvc = require('../data/users');
//    User = mongoose.model('user');


module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'email'
        },
        function (email, password, done) {
            email = email.toLowerCase();
            var _user;
            return usersSrvc.getFullUser({
                email: email
            }).then(validUser)
                .then(verifiedUser)
                .then(authenticateUser)
                .then(function (user) {
                    return done(null, user);
                })
                .catch(function (err) {
                    var info = {
                        status: err.message,
                        userId: _user ? _user.id : '',
                        firstName: _user ? _user.firstName : '',
                        email: _user ? _user.email : ''
                    };
                    return done(null, false, info);
                });

            function validUser(user) {
                _user = user;
                return new Promise(function (resolve, reject) {
                    if (!user) reject(new Error('invalid un/pw'));
                    if (!user.hashed_pwd) reject(new Error('no password'));
                    if (user.disabled) reject(new Error('disabled'));
                    resolve(user);
                });
            }

            function verifiedUser(user) {
                return new Promise(function (resolve, reject) {
                    if (user.verified) resolve(user);
                    if (user.hasRole('owner')) {
                        reject(new Error('un-verified owner'));
                    } else {
                        reject(new Error('un-verified user'));
                    }
                });
            }

            function authenticateUser(user) {
                return new Promise(function (resolve, reject) {
                    if (user.authenticate(password)) {
                        resolve(user);
                    } else {
                        reject(new Error('invalid un/pw'));
                    }
                });
            }

        }
    ));

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        usersSrvc.getUser({
            _id: id
        })
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(function (err) {
                return done(null, false);
            });
    });
};
*/