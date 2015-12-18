/*jshint expr: true */

/* jshint ignore:start */
var chai             = require('chai');
var appointmentsSrvc = require('../../../server/services/appointments');

var expect = chai.expect;

describe.skip('services', function () {
    describe('Create Appointment', function () {
        it('should create a new appointment', function (done) {
            var today = new Date();
            var tenMinTime = new Date(today);
            tenMinTime.setMinutes(today.getMinutes() + 10);

            var appointmentData = {
                site: testSite,
                appointmentTypeName: 'aaTestAppType',
                start: today,
                end: tenMinTime,
                resources: [testResource],
                clients: [testClient]
            };

            return appointmentsSrvc.createAppointment(appointmentData)
                .then(function (appointment) {
                    expect(appointment).to.be.defined;
                    testAppointment = appointment;
                    return done();
                })
                .catch(done);

        });

        it('should have a hash', function () {
            expect(testAppointment).to.have.property('hash');
        });

    });

    describe('Appointment doc hashing', function () {
        it('should export hashed document', function (done) {
            appointmentsSrvc.getHashedAppointment({
                _id: testAppointment._id
            })
                .then(function (hashedAppointment) {
                    expect(hashedAppointment).to.be.have.property('appointmentTypeName');
                    return done();
                })
                .catch(function (err) {
                    return done(err);
                });
        });

        it('should export a hash list', function (done) {
            appointmentsSrvc.getHashList({
                site: testAppointment.site
            })
                .then(function (hashList) {
                    //console.log('hashList: ' + JSON.stringify(hashList));
                    expect(hashList).to.not.be.empty;
                    return done();
                })
                .catch(function (err) {
                    return done(err);
                });
        });
    });
});
/* jshint ignore:end */
