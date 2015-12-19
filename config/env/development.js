


module.exports = {
	db: {
			uri: 'mongodb://localhost:27017/hack15',
			options: {
				user: '',
				pass: ''
		}
	},
	server: {
		PORT:'5000'
	},
	email: {
		user: process.env.EMAIL || 'placeholder@gmail.com',
		pass: process.env.EMAIL_PASS || 'placeholder'
	},

	facebookAuth : {
		'clientID'		: '927447444002913',
		'clientSecret'	: 'b30a560d628e196a94036065495d2d7f',
		'callbackURL'	: 'http://localhost:5001/auth/facebook/callback'
	},

	googleAuth : {
		'clientID'		: '648830601365-r3hi30tker1ujtihfstkqhklkno35619.apps.googleusercontent.com',
		'clientSecret'	: 'Y0UezWpzlAb1NDVrgRRN5OOm',
		'callbackURL'	: 'http://localhost:5001/auth/google/callback'
	},

	TOKEN_SECRET: 'my jwt secret'
}