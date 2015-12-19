


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
		user: 'placeholder@gmail.com',
		pass: 'placeholder'
	},
	
	facebookAuth : {
		'clientID'		: '949803935104303',
		'clientSecret'	: '5854b12a3b17dd38d6aa5b9ba0998351',
		'callbackURL'	: 'http://localhost:5001/auth/facebook/callback'
	},

	googleAuth : {
		'clientID'		: 'my-secret-clientID-here',
		'clientSecret'	: 'my-client-secret-here',
		'callbackURL'	: '/auth/google/callback'
	},

	TOKEN_SECRET: 'my jwt secret'
}