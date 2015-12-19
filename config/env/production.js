


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
		'clientID'		: '705492569196-tskji9sg5j6tfct9r4rgm29nn22gkbof.apps.googleusercontent.com',
		'clientSecret'	: 'xSUSbUpuEYhVVfFUNvg3urqR',
		'callbackURL'	: 'http://hacktbilisi.herokuapp.com/auth/google/callback'
	},

	TOKEN_SECRET: process.env.JWT_SECRET
}