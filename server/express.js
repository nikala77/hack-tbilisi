var express    = require('express');
var favicon    = require('serve-favicon');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var stylus     = require('stylus');
var path       = require('path');
var config     = require('../config/environment');

module.exports = function (app) {
    app.set('views', config.viewsPath);
    app.set('port', config.port);

    if (process.env.NODE_ENV !== 'test') {
        app.use(logger('dev'));
    }
    app.use(favicon(path.join(config.rootPath, 'client', 'images', 'favicon.ico')));
    app.use(express.static(config.publicPath));
    app.use(stylus.middleware(config.publicPath));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
};
