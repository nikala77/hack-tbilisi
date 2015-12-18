var icalendar        = require('icalendar');
var Promise          = require('bluebird');
var config           = require('../../config/environment');
var appointmentsSrvc = require('../services/appointments');
var aws              = require('./aws');

// TODO: test it
exports.updateIcals = function(appointment, client) {
    if (!config.icalendar.active) {
        return new Promise(function(resolve) {
            resolve(appointment);
        });
    }
    
    //this crashes after a backlog. Need to queue ;(
    // Promise.join(
    //     createAndPostIcals('client', appointment.clients),
    //     createAndPostIcals('resource', appointment.resources)
    // );
    // return Promise.resolve(appointment);
    // leave this code to run after return for better perf.
    return Promise
        .join(
            createAndPostIcals('client', appointment.clients),
            createAndPostIcals('resource', appointment.resources)
        )
        .then(function () {
            return appointment;
        });

    function createAndPostIcals(type, resources) {
        //type = client | resource
        var appointmentsPromises = resources.map(function(resource) {
            var query = type === 'client' ? {
                clients: resource
            } : {
                resources: resource
            };

            return appointmentsSrvc
                .getAppointments(query)
                .then(createIcal)
                .then(function(ical) {
                    return postIcal(ical, type, resource);
                });
        });

        return Promise.all(appointmentsPromises);
    }

    function createIcal(appointments) {
        return new Promise(function(resolve) {
            var events = appointments.map(function(appointment) {
                var event = new icalendar.VEvent(appointment._id.toString());
                event.setSummary(createApptmtSummary(appointment));
                event.setDate(appointment.start, appointments.end);
                return event;
            });

            var ical = new icalendar.iCalendar();
            ical.addComponents(events);
            resolve(ical);
        });
    }

    function postIcal(ical, type, _id) {
        var s3params = {
            Bucket: 'ical-au',
            Key: type + 's/' + _id + '.ics',
            Body: ical.toString(),
            ContentType: 'text/calendar'
        };
        return aws.s3putObject(s3params);
    }

    function createApptmtSummary(appointment) {
        var resourceNames = appointment.resources.map(function(resource) {
            return resource.name;
        }).join(', ');
        if (client) {
            return appointment.appointmentTypeName + ' for ' + client.name + ' with ' + resourceNames;
        } else {
            var clientNames = appointment.clients.map(function(client) {
                return client.name;
            }).join(', ');
            return appointment.appointmentTypeName + ' for ' + clientNames + ' with ' + resourceNames;
        }
    }
};

// TODO: test it
exports.getIcalUrl = function(type, _id) {
    //type = client | resource
    var url = 'https://s3-ap-southeast-2.amazonaws.com/ical-au/' + type + 's/' + _id + '.ics';
    return url;
};
