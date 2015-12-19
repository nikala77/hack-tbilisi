


module.exports = {
	db: {
		uri: process.env.DB_URI,
		options: {
			user: '',
			pass: ''
		}
	},
	server: {
		PORT : process.env.PORT
	},
	email: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS
	},
	
	facebookAuth : {
		'clientID'		: '1503160056680764',
		'clientSecret'	: 'b1532a35cc69d183d4d974baae087efc',
		'callbackURL'	: 'http://hacktbilisi.herokuapp.com/auth/facebook/callback'
	},

	googleAuth : {
		'clientID'		: '648830601365-r3hi30tker1ujtihfstkqhklkno35619.apps.googleusercontent.com',
		'clientSecret'	: 'Y0UezWpzlAb1NDVrgRRN5OOm',
		'callbackURL'	: 'http://hacktbilisi.herokuapp.com/auth/google/callback'
	},

	TOKEN_SECRET: process.env.JWT_SECRET
}