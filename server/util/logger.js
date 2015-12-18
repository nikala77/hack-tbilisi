var _       = require('lodash');
var winston = require('winston');
var fsExtra = require('fs-extra');
var config  = require('../../config/environment');
/* jshint -W030 */
require('winston-mongodb').MongoDB;
require('winston-mail').Mail;

_.each(config.winston.loggers, function(loggerConfig) {
  fsExtra.mkdirsSync(config.winston.logDir);
  var category = winston.loggers.add(loggerConfig.name, loggerConfig.transports);
  module.exports[loggerConfig.name] = category;
});
