var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        set: mongoose.toLower
    },
    displayName: String,
    title: String,
    firstName: String,
    lastName: String,
    pic: String,
    salt: {
        type: String,
        select: false
    },
    /* jshint camelcase: false */
    hashed_pwd: {
        type: String,
        select: false
    },
    apiKey: String,
    currentSite: {
        type: Schema.Types.ObjectId,
        ref: 'site'
    },
    siteRoles: [{
        site: {
            type: Schema.Types.ObjectId,
            index: true,
            ref: 'site'
        },
        dashboards: [{
            name: String,
            widgets: {
                left: [{
                    name: String,
                    _id: false
                }],
                right: [{
                    name: String,
                    _id: false
                }]
            },
            theme: {
                name: String,
                cssMin: String 
            } 
        }],
        roles: [String]
    }],
    verified: Date,
    disabled: Boolean
});

require('../models/UserMiddleware')(userSchema);
mongoose.model('user', userSchema);

exports.userSchema = userSchema;
