var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var siteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    created: {
        type: Date,
        default: Date.now
    },
    phone: String,
    email: String,
    pic: String
});

siteSchema.methods = {
    // TODO: unclear what this function do
    hasData: function() {
        return false;
    }
};

mongoose.model('site', siteSchema);
