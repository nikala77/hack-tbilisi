/* jshint ignore:start */
var crypto		 = require('crypto');
var moment		 = require('moment');
var config		 = require('../../config/environment');

exports.getSSOToken = function(guid, displayName, email, avatarUrl) {

	var accessToken = config.userEcho.logoutKey;
	
	var subdomain = 'zurili';
	var key = config.userEcho.loginKey;
	var nextDay = new Date();

	nextDay.setTime( nextDay.getTime() + 86400000 );

	var expiresDate = moment().add(1, 'days').format('YYYY-MM-DD h:mm:ss');

	var message = {
		guid: guid, // User ID in your system - using for identify user in next time (first time auto-registion)
		expires_date: expiresDate, // sso_token expiration date in format "Y-m-d H:i:s". Recommend set date now() + 1 day
		display_name: displayName, // User display name in your system
		email: email, // User email - using for notification about changes on feedback
		avatar_url: avatarUrl,
		verified_email: true,
		locale:'en' // Default user language
	};

	var randStr = randomString(16);

	var iv = Buffer(randStr, 'binary');

	var json = JSON.stringify(message);

	var salted = Buffer(
		crypto.createHash('sha1')
			.update(key + subdomain, 'utf8')
			.digest()
		, 'binary'
	);

	var xored = Buffer(json, 'binary');

	// xor the iv into the first 16 bytes.
	for (var i = 0; i < 16; xored[i] = xored[i] ^ iv[i++]);

	var aes = crypto.createCipheriv('aes128', salted.slice(0, 16), iv),
	token = '';

	token += aes.update(xored.toString('binary'), 'binary', 'base64');
	token += aes.final('base64');

	token = encodeURIComponent(token);

	// console.log('UserEcho URL with SSO TOKEN: http://%s.userecho.com?sso_token=%s', subdomain, token);

	return {
		'token': token,
		'accessToken': accessToken 
	};
}


function randomString(size){
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for( var i=0; i < size; i++ ) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}
/* jshint ignore:end */