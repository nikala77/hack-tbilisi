var usersSrvc =	require('../services/user');
var mongoose  = require('mongoose');
var config 	  = require('../../config/env');
var jwt 	  = require('jsonwebtoken');
var moment 	  = require('moment');
var User      = mongoose.model('User');

exports.createUser = function(req, res) {
	var userData = req.body;

	usersSrvc.createUser(userData)
	.then(function(data) {
		res.status(200).send(data);
	})
	.catch(function(err) {
		console.log('catch error', err);
		res.status(500).send(err);
	});
};

exports.authenticateUser = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	
	User.findOne({ email: email })
	.then(function(user) {
		if (!user) {
			console.log('User not found');
			res.status(500).send(new Error('Authentication failed. User not found.'));
		} else {
			// check if password matches
			if (!usersSrvc.compareCredentials(user.apiKey, email, password)) {
				console.log('Passwords don\'t matches');
				res.status(500).send(new Error('Authentication failed. Wrong password.'));
			} else {
				// if user is found and password is right
				// create a token
				var payload = {
					email: email,
					password: password,
					exp: moment().add(1, 'days').unix()
				};
				var token =  jwt.sign(payload, config.TOKEN_SECRET);

				// return the information including jwt as JSON
				res.json({
					message: 'Authentication was successfull',
					jwt: token
				});
			}
		}
	})
	.catch(function(err) {
		console.log('authenticate error', err);
		res.status(500).send(err);
	});
};

exports.ensureAuthenticated = function(req, res, next) {
	var token = req.headers['authorization'];

	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.TOKEN_SECRET, function(err, decoded) { 
			if (err) {
				console.log('faild token Authentication.');
				return res.status(500).send(new Error('Failed to authenticate token.' ));    
			} else {
				if(usersSrvc.isExpired(decoded.exp)) {
					return res.status(403).send(new Error('Token expired.'));
				} else {
					return next();
				}
			}
		});
	} else {
		// if there is no token return an error
		return res.status(403).send(new Error('No token provided.'));
	}
};