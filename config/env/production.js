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
		'clientID'		: '1044588175600350',
		'clientSecret'	: '3110c323bcc062c5d334a2593a839c82',
		'callbackURL'	: 'http://bannermaker.herokuapp.com/auth/facebook/callback'
	},

	googleAuth : {
		'clientID'		: '648830601365-r3hi30tker1ujtihfstkqhklkno35619.apps.googleusercontent.com',
		'clientSecret'	: 'Y0UezWpzlAb1NDVrgRRN5OOm',
		'callbackURL'	: 'http://bannermaker.herokuapp.com/auth/google/callback'
	},

	TOKEN_SECRET: process.env.JWT_SECRET
}