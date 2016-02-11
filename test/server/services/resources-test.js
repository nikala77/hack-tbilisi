/*jshint expr: true */

/* jshint ignore:start */
var chai             = require('chai');
var resourcesSrvc    = require('../../../server/services/resources');
var appointmentsSrvc = require('../../../server/services/appointments');

var expect = chai.expect;

describe.skip('services', function () {
    describe('Create Resource', function () {
        it('should have 3 fields in list', function () {
            return expect(propertyCount()).to.eventually.equal(3);

            function propertyCount() {
                return resourcesSrvc.listResources({
                    site: testSite
                })
                    .then(function (resources) {
                        var length = Object.getOwnPropertyNames(resources[0]._doc).length;
                        return length;
                    });
            }
        });

        it('should be removed from appointment if deleted', function () {
            return expect(removeAndCheck()).to.eventually.be.null;

            function removeAndCheck() {
                var newResourceId, newResource;

                var today = new Date();
                var tenMinTime = new Date(today);
                tenMinTime.setMinutes(today.getMinutes() + 10);

                var appointmentData = {
                    site: testSite,
                    appointmentTypeName: 'aaWhatever',
                    start: today,
                    end: tenMinTime,
                    clients: [testClient]
                };

                return resourcesSrvc.createResource(testSite, 'aaTempResource')
                    .then(function (resource) {
                        newResource = resource;
                        newResourceId = resource._id;
                        appointmentData.resources = [newResource];
                        return appointmentsSrvc.createAppointment(appointmentData)
                            .then(function (appointment) {
                                return resourcesSrvc.deleteResource(newResource)
                                    .then(function (resource) {
                                        return appointmentsSrvc.getAppointment({
                                            resources: newResourceId
                                        });
                                    });
                            });
                    });
            }
        });
    });
});
/* jshint ignore:end */
