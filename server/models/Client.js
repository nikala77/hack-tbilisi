var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var clientSchema = new Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
        required: true,
        index: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },
    knownAs: {
        type: String,
        index: true
    },
    title: String,
    dob: Date,
    pic: String,
    address: String,
    email: {
        type: String,
        index: true
    },
    mobile: {
        type: String,
        index: true
    },
    phone: {
        type: String,
        index: true
    },
    occupation: String,
    hobbies: String,
    status: { //Active, Inactive
        type: String,
        default: 'Active'
    },
    hash: String,
    lastEditedBy: {
        type: {},
        select: false
    },
    relations: {
        name: String,
        relationship: String,
        pic: String,
        client: {
            type: Schema.Types.ObjectId,
            ref: 'client'
        }
    },
    stats: {
        appointments: {
            stats: {
                kept: Number,
                missed: Number
            },
            nextAppointments: {
                start: Date,
                appointmentTypeName: String,
                resourceNames: [String],
                appointment: {
                    type: Schema.Types.ObjectId,
                    ref: 'appointment'
                }
            },
            lastVisits: {
                date: Date,
                appointmentTypeName: String,
                appointment: {
                    type: Schema.Types.ObjectId,
                    ref: 'appointment'
                }
            }
        },
        account: {
            balance: Number,
            recentTransactions: {
                date: Date,
                item: String,
                amount: Number,
                ledger: {
                    type: Schema.Types.ObjectId,
                    ref: 'ledger'
                }
            }
        }
    }
}, {
    id: false
});

clientSchema.index({
    site: 1,
    firstName: 1,
    lastName: 1
});

var hashFields = ['firstName', 'lastName', 'knownAs', 'dob', 'title', 'address', 'email', 'mobile', 'phone', 'occupation', 'hobbies'];
clientSchema.statics.hashFields = hashFields;

require('../models/ClientMiddleware')(clientSchema);
mongoose.model('client', clientSchema);

exports.clientSchema = clientSchema;
