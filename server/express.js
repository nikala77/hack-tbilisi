/**
 * Module dependencies.
 */
var express        = require('express');
var requireDir	   = require('require-dir');
var	bodyParser     = require('body-parser');
var	methodOverride = require('method-override');
var	cookieParser   = require('cookie-parser');
var	config         = require('../config/env');
var	consolidate    = require('consolidate');
var session 	   = require('express-session');
var passport 	   = require('passport');

module.exports = function() {
	// Initialize express app
	var app = express();
	// Showing stack errors
	app.set('showStackError', true);

	// include schema models
	requireDir('./models', { recurse: true });

	// Set swig as the template engine
	app.set('PORT' , (process.env.PORT || config.server.PORT))
		// Set swig as the template engine
		.engine('html', consolidate.swig)
		// Set views path and view engine
		.set('view engine', 'html')
		.set('views', config.viewsPath)
		.set('superSecret', config.TOKEN_SECRET)
		.use(bodyParser.urlencoded({ extended: true }))
		.use(bodyParser.json()) //body parsing middleware should be above methodOverride
		.use(cookieParser())    // CookieParser should be above session
		.use(session({
			secret: 'someSecret',
			saveUninitialized: true,
			resave: true
  		}))
		.use(methodOverride())
		.use(express.static('./public'))
		.use(passport.initialize())
    	.use(passport.session());

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}


	// include routing files
	require('./routes')(app, passport);

	
	return app;
};