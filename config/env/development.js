


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
		user: 'placeholder@gmail.com',
		pass: 'placeholder'
	},

	facebookAuth : {
		'clientID'		: '927447444002913',
		'clientSecret'	: 'b30a560d628e196a94036065495d2d7f',
		'callbackURL'	: 'http://localhost:5001/auth/facebook/callback'
	},

	googleAuth : {
		'clientID'		: 'my-secret-clientID-here',
		'clientSecret'	: 'my-client-secret-here',
		'callbackURL'	: '/auth/google/callback'
	},

	TOKEN_SECRET: 'my jwt secret'
}