module.exports = {
	db: {
			uri: 'mongodb://localhost:27017/bannermaker',
			options: {
				user: '',
				pass: ''
		}
	},
	server: {
		PORT:'5000'
	},
	email: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS
	},

	facebookAuth : {
		'clientID'		: '1044588175600350',
		'clientSecret'	: '3110c323bcc062c5d334a2593a839c82',
		'callbackURL'	: 'http://localhost:5001/auth/facebook/callback'
	},

	googleAuth : {
		'clientID'		: '648830601365-r3hi30tker1ujtihfstkqhklkno35619.apps.googleusercontent.com',
		'clientSecret'	: 'Y0UezWpzlAb1NDVrgRRN5OOm',
		'callbackURL'	: 'http://localhost:5001/auth/google/callback'
	},

	TOKEN_SECRET: 'my jwt secret'
}