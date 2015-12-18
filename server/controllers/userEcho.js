var userEcho = require('../util/userEcho');
var jwt 	 = require('jwt-simple');
var config	 = require('../../config/environment');
var Users	 = require('../services/users');

exports.getToken = function(req, res) {

	try {
		var userToken = req.headers.authorization.split(' ')[1];
		var payload   = jwt.decode(userToken, config.TOKEN_SECRET);
		var userID = payload.sub._id;

		Users.getUser({ _id: userID })
			.then(function(data) {
				var email = data.email;
				var displayName = data.displayName;
				var avatarUrl = data.pic ? data.pic : '';

				var ssoToken = userEcho.getSSOToken(userID, displayName, email, avatarUrl);

				return res.json({ 'token': ssoToken.token, 'accessToken': ssoToken.accessToken });
			})
			.catch(function(err) {
				res.status(401).send('Request must have Authorization header '+ err);
			});

	} catch(err) {
		res.status(401).send('Request must have Authorization header '+ err);
	}
};