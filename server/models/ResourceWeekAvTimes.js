var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// TODO: indexes
var resourceWeekAvTimesSchema = new Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
        required: true,
        index: true
    },
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'resource',
        required: true,
        index: true
    },
    year: {
        type: Number,
        required: true,
        index: true
    },
    weeknumber: {
        type: Number,
        required: true,
        index: true
    },
    blocks: [{
        _id: false,
        regionId: {
            type: Number,
            required: true
        },
        weekday: {
            type: Number,
            required: true
        },
        start: {
            type: Number,
            required: true
        },
        end: {
            type: Number,
            required: true
        }
    }]
});

mongoose.model('resourceWeekAvTimes', resourceWeekAvTimesSchema);
