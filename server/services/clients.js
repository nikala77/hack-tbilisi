var appointmentsSrvc = require('./appointments');
var encryption       = require('../util/encryption');
var Client           = require('mongoose').model('client');

// TODO: test it
exports.listClients = function(params, limit) {
    //limit = limit || 25;
    
    return Client
        .find(params)
        .select('_id firstName lastName knownAs dob pic')
        .limit(limit)
        .execAsync();
};

// TODO: test it
exports.getClients = function(params) {
    return Client
        .find(params)
        .select('-__v')
        .execAsync();
};

// TODO: test it
exports.getClient = function(params) {
    return Client
        .findOne(params)
        .select('-__v')
        .execAsync();
};

// TODO: test it
exports.createClient = function(clientData) {
    //attach lastEditedBy=user for sync and audit
    return Client.createAsync(clientData);
};

// TODO: test it
exports.saveClient = function(client) {
    //attach lastEditedBy=user for sync and audit
    return client
        .saveAsync()
        .spread(function(client) {
            return client;
        });
};

// TODO: test it
exports.deleteClient = function(client) {
    return checkForAppointments(client)
        .then(removeClient);

    function removeClient(client) {
        return client.removeAsync();
    }

    function checkForAppointments(client) {
        return appointmentsSrvc.listAppointments({
                clients: client
            })
            .then(function(appointments) {
                if (appointments.length > 0) {
                    throw new Error('Cannot delete client with appointments');
                }
                return client;
            });
    }
};

// TODO: test it
exports.getHashedClient = function(params) {
    return Client
        .findOneAsync(params)
        .then(hashClient);

    function hashClient(client) {
        var hashFields = Client.hashFields;
        return encryption.createHashedObject(client, hashFields);
    }
};

// TODO: test it
exports.getHashList = function(params) {
    return Client
        .find(params)
        .select('hash')
        .execAsync();
};
