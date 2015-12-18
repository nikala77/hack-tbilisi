var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        index: true
    },
    type: {
        type: String,
        required: true,
        index: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now(),
        expires: '7d'
    },
    processed: Date,
    data: String
});

mongoose.model('token', tokenSchema);
