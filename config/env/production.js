


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
	TOKEN_SECRET: 'my jwt secret'
}