process.env.NODE_ENV = process.env.NODE_ENV || 'development';



var path = require('path');
var _    = require('lodash');
var	fs   = require('fs');

var rootPath = path.normalize(__dirname + '/../../');

var defConfig = {
    // Environment
    env: process.env.NODE_ENV,

    // Root dir path
    rootPath: rootPath,

    // Views dir path
    viewsPath: path.join(rootPath, 'server/views'),

    // Public dir path
    publicPath: path.join(rootPath, 'public'),

    // Winston logger config
    winston: {
        logDir: path.join(rootPath, 'logs')
    }
};

var envConfig = require('./'+ process.env.NODE_ENV);

var config = _.merge(defConfig, envConfig);

module.exports = config;