var _                = require('lodash');
var mongoose         = require('mongoose');
var appointmentsSrvc = require('../services/appointments');
var Resource         = require('mongoose').model('resource');

// TODO: test it
exports.getResource = function(params, keys) {
    var keysrefs = mongoose.splitKeysRefs(keys);
    var query = Resource
        .findOne(params)
        .select(keysrefs.keys);
    
    _.each(keysrefs.refs, function(ref) {
        query = query.populate(ref.name, ref.keys);
    });
    
    return query.execAsync();
};

// TODO: test it
exports.getResources = function(params, keys) {
    var keysrefs = mongoose.splitKeysRefs(keys);
    var query = Resource
        .find(params)
        .select(keysrefs.keys)
        .sort('name');
        
    _.each(keysrefs.refs, function(ref) {
        query = query.populate(ref.name, ref.keys);
    });
    
    return query.execAsync();
};

// TODO: test it
exports.createResource = function(resourceData) {
    // site, name, practitioner) {
    //attach lastEditedBy=user for sync and audit
    return Resource.createAsync(resourceData);
};

// TODO: test it
exports.createDefaultResource = function(site, practitioner) {
    var resourceData = {
        site: site,
        name: 'New Resource',
        appointmentInterval: 10,
        practitioner: practitioner
    };
    
    return Resource.createAsync(resourceData);
};

// TODO: test it
exports.saveResource = function(resource) {
    //attach lastEditedBy=user for sync and audit
    return resource
        .saveAsync()
        .spread(function(resource) {
            return resource;
        });
};

// TODO: test it
exports.deleteResource = function(resource) {
    return removeAppointmentsForResource(resource)
        .then(removeResource);
    
    function removeAppointmentsForResource(resource) {
        return appointmentsSrvc
            .getAppointments({
                resources: resource
            })
            .map(function(appointment) {
                if (appointment.resources.length === 1) {
                    //delete the appointment... maybe we should just leave it with no resource?
                    return appointmentsSrvc.deleteAppointment(appointment);
                } else {
                    //remove the resource from the appointment
                    var index = -1;
                    for (var i = 0; i < appointment.resources.length; i++) {
                        if (appointment.resources[i]._id === resource._id) {
                            index = i;
                        }
                    }
                    if (index > -1) {
                        appointment.resources.splice(index, 1);
                    }
                }
            })
            .then(function() {
                return resource;
            });
    }

    function removeResource(resource) {
        return resource.removeAsync();
    }
};

// TODO: test it
exports.getHashList = function(params) {
    return Resource
        .find(params)
        .select('hash')
        .execAsync();
};
