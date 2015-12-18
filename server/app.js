var express = require('express');
var config  = require('../config/environment');
var db      = require('./util/mongoose');

require('./util/promisify');
require('./util/raygun-logger');
require('./util/logger');
require('./util/mailgun');
require('./util/aws');
require('./util/sms');

var app = express();
require('./express')(app);
require('./routes')(app);

if (app.get('env') !== 'test') {
    db.connect();
    
    app.listen(app.get('port'), function () {
        console.log('Express server started', 'environment=' + config.env, 'listening on port=' + config.port);
    });
}

module.exports = app;
