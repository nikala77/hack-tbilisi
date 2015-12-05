


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
	TOKEN_SECRET: 'my jwt secret'
}