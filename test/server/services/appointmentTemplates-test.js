/*jshint expr: true */

/* jshint ignore:start */
var chai             = require('chai');
var appointmentsSrvc = require('../../../server/services/appointments');
var atSrvc           = require('../../../server/services/appointmentTemplates');

var expect = chai.expect;

var testAT, testAT2;

describe.skip('services', function () {
    describe('Create Appointment Template', function () {
        it('should create a new AT', function () {
            return expect(createAT1()).to.be.resolved;

            function createAT1() {
                var atData = {
                    site: testSite._id,
                    name: 'aaa test AT'
                };
                return atSrvc.createAppointmentTemplate(atData)
                    .then(function (at) {
                        testAT = at;
                        return at;
                    });
            }
        });

        it('should create a new AT with resource', function (done) {
            return createAT2()
                .then(function (at) {
                    expect(at).to.have.property('resourceNames').with.length(1);
                    return done();
                })
                .catch(done);

            function createAT2() {
                var atData = {
                    site: testSite._id,
                    name: 'aaa test AT',
                    resources: [testResource._id]
                };
                return atSrvc.createAppointmentTemplate(atData)
                    .then(function (at) {
                        testAT2 = at;
                        return at;
                    });
            }
        });
    });

    describe('Delete Appointment Template', function () {
        it('should remove AT from appointments', function (done) {
            var today = new Date();
            var tenMinTime = new Date(today);
            tenMinTime.setMinutes(today.getMinutes() + 10);

            var appointmentData = {
                site: testSite,
                appointmentTypeName: 'aaTestAppType',
                start: today,
                end: tenMinTime,
                appointmentTemplate: testAT
            };

            return appointmentsSrvc.createAppointment(appointmentData)
                .then(function (appointment) {
                    return atSrvc.getAppointmentTemplate({
                        _id: appointment.appointmentTemplate
                    })
                        .then(atSrvc.deleteAppointmentTemplate)
                        .then(function () {
                            return appointmentsSrvc.getAppointment({
                                _id: appointment._id
                            })
                                .then(function (appointment2) {
                                    expect(appointment2.appointmentTemplate).to.be.undefined;
                                    return done();
                                })
                                .catch(done);
                        });
                });
        });

        it('should remove AT', function () {
            return expect(atSrvc.deleteAppointmentTemplate(testAT2)).to.be.fulfilled;
        });
    });
});
/* jshint ignore:end */
