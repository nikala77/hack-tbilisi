var _        = require('lodash');
var mongoose = require('mongoose');
var config   = require('../../config/environment');

//so mocha doesn't get OverwriteModelError when use --watch
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.splitKeysRefs = function(keysrefs) {
    if (!keysrefs) {
        return { keys: '-__v' };
    }
    
    var keysArray = keysrefs.split(' ');
    var keys = [];
    var refs = [];
    _.each(keysArray, function(key) {
        var refkey = key.split('.');
        if (refkey.length === 2) {
            var refName = refkey[0];
            var refKeys = refkey[1].split(':').join(' ');
            refs.push({ name: refName, keys: refKeys });
        } else {
            keys.push(key);
        }
    });
    
    return {
        keys: keys.join(' '),
        refs: refs
    }; 
};

mongoose.toLower = function(val) {
    if (val) {
        return val.toLowerCase();
    }
    return val;
};

require('../models/Site');
require('../models/User');
require('../models/Token');
require('../models/Patch');
require('../models/Appointment');
require('../models/AppointmentTemplate');
require('../models/Resource');
require('../models/ResourceWeekAvTimes');
require('../models/Client');

var conn = mongoose.connection;

if (process.env.NODE_ENV !== 'test') {
    conn.on('error', function(err) {
        console.log('[db]', 'Database connection error', err);
    });

    conn.on('connected', function () {
        console.log('[db]', 'Connected to database: ' + config.db);
    });

    conn.on('disconnected', function () {
        console.log('[db]', 'Disconnected from database');
    });
}

module.exports = {
    conn: conn,
    connect: function(cb) {
        conn.open(config.db, cb);
    },
    disconnect: function(cb) {
        conn.close(cb);
    }
};
