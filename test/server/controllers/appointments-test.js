// var _        = require('lodash');
// var request  = require('supertest');
// var Promise  = require('bluebird');
// var db       = require('mongoose');
// var moment   = require('moment');
// var sinon    = require('sinon');
// var app      = require('../../../server/app');
// var sync     = require('../../../server/util/sync');
// var ical     = require('../../../server/util/ical');
// var testUtil = require('../../testUtil/test-util');

// describe('controllers', function() {
//     describe('appointments', function() {
//         var currentUser = {
//             _id: testUtil.ObjectId(),
//             roles: ['admin'],
//             currentSite: testUtil.ObjectId()
//         };
        
//         before(function() {
//             sinon.stub(sync, 'writeToQueues', function() {}); // required to prevent object.save actions
//             sinon.stub(ical, 'updateIcals', function() {}); // required to prevent object.save actions
//         });
        
//         beforeEach(function() {
//             testUtil.signIn(currentUser);
//         });
        
//         afterEach(function() {
//             testUtil.signOut();
//         });
        
//         after(function() {
//             sync.writeToQueues.restore();
//             ical.updateIcals.restore();
//         });
        
//         describe('getAppointments', function() {
//             /* jshint maxstatements: false */
//             var initialSites = [
//                 {
//                     _id: currentUser.currentSite,
//                     name: 'site1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1',
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                 }
//             ];
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 }
//             ];
//             var initialClients = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     firstName: 'client1'
//                 }
//             ];
//             var initialAppointments = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment1',
//                     appointmentTemplate: initialAppointmentTemplates[0]._id,
//                     clients: [initialClients[0]._id],
//                     resources: [initialResources[0]._id],
//                     start: moment('2015-01-01'),
//                     end: moment('2015-01-01').add(30, 'minutes'),
//                     duration: 30,
//                     color: 'red',
//                     note: 'note1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment2',
//                     start: moment('2015-02-01'),
//                     end: moment('2015-02-01').add(60, 'minutes'),
//                     duration: 30,
//                     color: 'green'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     appointmentTypeName: 'appointment3',
//                     appointmentTemplate: initialAppointmentTemplates[1]._id,
//                     start: moment('2015-03-01'),
//                     end: moment('2015-03-01').add(90, 'minutes'),
//                     duration: 90,
//                     color: 'blue'
//                 }
//             ];
            
//             function test(query, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('client'), initialClients);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointment'), initialAppointments);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/appointments/')
//                                 .query(query)
//                                 .expect(expectedStatus)
//                                 .expect('Content-Type', /json/)
//                                 .expect(function(res) {
//                                     testUtil.assert(res.body, expectedBody);
//                                 })
//                                 .end(function(err) {
//                                     if (err) { return reject(err); }
//                                     resolve();
//                                 });
//                         });
//                     })
//                     .then(function() {
//                         done();
//                     })
//                     .catch(done);
//             }
            
//             function getQuery(diff) {
//                 var query = {
//                     start: moment('2015-01-01').format(),
//                     end: moment('2015-01-31').format()
//                 };
//                 return _.assign(query, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var query = getQuery();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.start is not date', function(done) {
//                 var query = getQuery({ start: 'invalid date' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Invalid date'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.end is not date', function(done) {
//                 var query = getQuery({ end: 'invalid date' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter end, val=Invalid date'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.start > req.query.end', function(done) {
//                 var query = getQuery({
//                     start: moment().add(10, 'days').format(),
//                     end: moment().format()
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter end, val=End must be greater than Start'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.clients is not array', function(done) {
//                 var query = getQuery({
//                     clients: 'invalid clients'
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter clients, val=Invalid array or contains invalid id'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.clients contains invalid ref', function(done) {
//                 var query = getQuery({
//                     clients: [testUtil.ObjectId().toString(), 'invalidId']
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter clients, val=Invalid array or contains invalid id'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.resources is not array', function(done) {
//                 var query = getQuery({
//                     resources: 'invalid resources'
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.resources contains invalid ref', function(done) {
//                 var query = getQuery({
//                     resources: [testUtil.ObjectId().toString(), 'invalidId']
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes is not array', function(done) {
//                 var query = getQuery({
//                     includes: 'invalid includes'
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes contains invalid ref', function(done) {
//                 var query = getQuery({
//                     includes: ['invalid ref', 'clients', 'resources']
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointments.json when req.query contains only start,end (case 1)', function(done) {
//                 var query = getQuery();
//                 var expectedStatus = 200;
//                 var appointment1 = initialAppointments[0];
//                 var expectedBody = [
//                     {
//                         _id: appointment1._id.toString(),
//                         appointmentTypeName: appointment1.appointmentTypeName,
//                         appointmentTemplate: appointment1.appointmentTemplate.toString(),
//                         clients: [initialClients[0]._id.toString()],
//                         resources: [initialResources[0]._id.toString()],
//                         start: appointment1.start.toISOString(),
//                         end: appointment1.end.toISOString(),
//                         duration: appointment1.duration,
//                         color: appointment1.color,
//                         textColor: 'black'
//                     }
//                 ];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointments.json when req.query contains only start,end (case 2)', function(done) {
//                 var query = getQuery({
//                     start: moment('2015-02-01').format(),
//                     end: moment().format()
//                 });
//                 var expectedStatus = 200;
//                 var appointment2 = initialAppointments[1];
//                 var expectedBody = [{
//                     _id: appointment2._id.toString(),
//                     appointmentTypeName: appointment2.appointmentTypeName,
//                     clients: [],
//                     resources: [],
//                     start: appointment2.start.toISOString(),
//                     end: appointment2.end.toISOString(),
//                     duration: appointment2.duration,
//                     color: appointment2.color,
//                     textColor: 'black'
//                 }];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointments.json when req.query.includes=[appointmentTemplate]', function(done) {
//                 var query = getQuery({ includes: ['appointmentTemplate'] });
//                 var expectedStatus = 200;
//                 var appointment1 = initialAppointments[0];
//                 var expectedBody = [{
//                     _id: appointment1._id.toString(),
//                     appointmentTypeName: appointment1.appointmentTypeName,
//                     appointmentTemplate: {
//                         _id: appointment1.appointmentTemplate.toString(),
//                         name: 'at1'
//                     },
//                     clients: [initialClients[0]._id.toString()],
//                     resources: [initialResources[0]._id.toString()],
//                     start: appointment1.start.toISOString(),
//                     end: appointment1.end.toISOString(),
//                     duration: appointment1.duration,
//                     color: appointment1.color,
//                     textColor: 'black'
//                 }];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointments.json when req.query.includes=[clients]', function(done) {
//                 var query = getQuery({ includes: ['clients'] });
//                 var expectedStatus = 200;
//                 var appointment1 = initialAppointments[0];
//                 var expectedBody = [{
//                     _id: appointment1._id.toString(),
//                     appointmentTypeName: appointment1.appointmentTypeName,
//                     appointmentTemplate: appointment1.appointmentTemplate.toString(),
//                     clients: [{
//                         _id: initialClients[0]._id.toString(),
//                         firstName: 'client1'
//                     }],
//                     resources: [initialResources[0]._id.toString()],
//                     start: appointment1.start.toISOString(),
//                     end: appointment1.end.toISOString(),
//                     duration: appointment1.duration,
//                     color: appointment1.color,
//                     textColor: 'black'
//                 }];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointments.json when req.query.includes=[resources]', function(done) {
//                 var query = getQuery({ includes: ['resources'] });
//                 var expectedStatus = 200;
//                 var appointment1 = initialAppointments[0];
//                 var expectedBody = [{
//                     _id: appointment1._id.toString(),
//                     appointmentTypeName: appointment1.appointmentTypeName,
//                     appointmentTemplate: appointment1.appointmentTemplate.toString(),
//                     clients: [initialClients[0]._id.toString()],
//                     resources: [{
//                         _id: initialResources[0]._id.toString(),
//                         name: 'resource1',
//                         appointmentInterval: 11
//                     }],
//                     start: appointment1.start.toISOString(),
//                     end: appointment1.end.toISOString(),
//                     duration: appointment1.duration,
//                     color: appointment1.color,
//                     textColor: 'black'
//                 }];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointments.json when req.query.clients=Array', function(done) {
//                 var query = getQuery({
//                     clients: [initialClients[0]._id.toString()]
//                 });
//                 var expectedStatus = 200;
//                 var appointment1 = initialAppointments[0];
//                 var expectedBody = [{
//                     _id: appointment1._id.toString(),
//                     appointmentTypeName: appointment1.appointmentTypeName,
//                     appointmentTemplate: appointment1.appointmentTemplate.toString(),
//                     clients: [initialClients[0]._id.toString()],
//                     resources: [initialResources[0]._id.toString()],
//                     start: appointment1.start.toISOString(),
//                     end: appointment1.end.toISOString(),
//                     duration: appointment1.duration,
//                     color: appointment1.color,
//                     textColor: 'black'
//                 }];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointments.json when req.query.resources=Array', function(done) {
//                 var query = getQuery({
//                     resources: [initialResources[0]._id.toString()]
//                 });
//                 var expectedStatus = 200;
//                 var appointment1 = initialAppointments[0];
//                 var expectedBody = [{
//                     _id: appointment1._id.toString(),
//                     appointmentTypeName: appointment1.appointmentTypeName,
//                     appointmentTemplate: appointment1.appointmentTemplate.toString(),
//                     clients: [initialClients[0]._id.toString()],
//                     resources: [initialResources[0]._id.toString()],
//                     start: appointment1.start.toISOString(),
//                     end: appointment1.end.toISOString(),
//                     duration: appointment1.duration,
//                     color: appointment1.color,
//                     textColor: 'black'
//                 }];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('getAppointmentById', function() {
//             /* jshint maxstatements: false */
//             var initialSites = [
//                 {
//                     _id: currentUser.currentSite,
//                     name: 'site1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1',
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                 }
//             ];
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 }
//             ];
//             var initialClients = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     firstName: 'client1'
//                 }
//             ];
//             var initialAppointments = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment1',
//                     appointmentTemplate: initialAppointmentTemplates[0]._id,
//                     clients: [initialClients[0]._id],
//                     resources: [initialResources[0]._id],
//                     start: moment('2015-01-01'),
//                     end: moment('2015-01-01').add(30, 'minutes'),
//                     duration: 30,
//                     color: 'red',
//                     note: 'note1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment2',
//                     start: moment('2015-02-01'),
//                     end: moment('2015-02-01').add(60, 'minutes'),
//                     duration: 30,
//                     color: 'green'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     appointmentTypeName: 'appointment3',
//                     appointmentTemplate: initialAppointmentTemplates[1]._id,
//                     start: moment('2015-03-01'),
//                     end: moment('2015-03-01').add(90, 'minutes'),
//                     duration: 90,
//                     color: 'blue'
//                 }
//             ];
            
//             function test(appointmentId, query, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('client'), initialClients);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointment'), initialAppointments);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/appointments/' + appointmentId)
//                                 .query(query)
//                                 .expect(expectedStatus)
//                                 .expect('Content-Type', /json/)
//                                 .expect(function(res) {
//                                     testUtil.assert(res.body, expectedBody);
//                                 })
//                                 .end(function(err){
//                                     if (err) { return reject(err); }
//                                     resolve();
//                                 });
//                         });
//                     })
//                     .then(function() {
//                         done();
//                     })
//                     .catch(done);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var appointment = initialAppointments[0];
//                 var query = {};
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(appointment._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var appointmentId = 'Invalid Id';
//                 var query = {};
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=Invalid id'
//                 };
                
//                 test(appointmentId, query, expectedStatus, expectedBody, done);
//             });
           
//             it('should return status 404 when appointment is not found by req.params._id', function(done) {
//                 var appointmentId = testUtil.ObjectId();
//                 var query = {};
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'appointment not found'
//                 };
                
//                 test(appointmentId, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes is not array', function(done) {
//                 var appointment = initialAppointments[0];
//                 var query = {
//                     includes: 'invalid includes'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(appointment._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes contains invalid ref', function(done) {
//                 var appointment = initialAppointments[0];
//                 var query = {
//                     includes: ['invalid ref', 'clients', 'resources']
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(appointment._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointment.json when req.query is empty', function(done) {
//                 var appointment = initialAppointments[0];
//                 var query = {};
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: appointment._id.toString(),
//                     appointmentTypeName: appointment.appointmentTypeName,
//                     appointmentTemplate: appointment.appointmentTemplate.toString(),
//                     clients: [initialClients[0]._id.toString()],
//                     resources: [initialResources[0]._id.toString()],
//                     start: appointment.start.toISOString(),
//                     duration: appointment.duration,
//                     color: appointment.color,
//                     textColor: 'black',
//                     note: appointment.note
//                 };
                
//                 test(appointment._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointment.json when req.query.includes=[appointmentTemplate]', function(done) {
//                 var appointment = initialAppointments[0];
//                 var query = { includes: ['appointmentTemplate'] };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: appointment._id.toString(),
//                     appointmentTypeName: appointment.appointmentTypeName,
//                     appointmentTemplate: {
//                         _id: appointment.appointmentTemplate.toString(),
//                         name: 'at1'
//                     },
//                     clients: [initialClients[0]._id.toString()],
//                     resources: [initialResources[0]._id.toString()],
//                     start: appointment.start.toISOString(),
//                     duration: appointment.duration,
//                     color: appointment.color,
//                     textColor: 'black',
//                     note: appointment.note
//                 };
                
//                 test(appointment._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointment.json when req.query.includes=[clients]', function(done) {
//                 var appointment = initialAppointments[0];
//                 var query = { includes: ['clients'] };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: appointment._id.toString(),
//                     appointmentTypeName: appointment.appointmentTypeName,
//                     appointmentTemplate: appointment.appointmentTemplate.toString(),
//                     clients: [{
//                         _id: initialClients[0]._id.toString(),
//                         firstName: 'client1'
//                     }],
//                     resources: [initialResources[0]._id.toString()],
//                     start: appointment.start.toISOString(),
//                     duration: appointment.duration,
//                     color: appointment.color,
//                     textColor: 'black',
//                     note: appointment.note
//                 };
                
//                 test(appointment._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointment.json when req.query.includes=[resources]', function(done) {
//                 var appointment = initialAppointments[0];
//                 var query = { includes: ['resources'] };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: appointment._id.toString(),
//                     appointmentTypeName: appointment.appointmentTypeName,
//                     appointmentTemplate: appointment.appointmentTemplate.toString(),
//                     clients: [initialClients[0]._id.toString()],
//                     resources: [{
//                         _id: initialResources[0]._id.toString(),
//                         name: 'resource1'
//                     }],
//                     start: appointment.start.toISOString(),
//                     duration: appointment.duration,
//                     color: appointment.color,
//                     textColor: 'black',
//                     note: appointment.note
//                 };
                
//                 test(appointment._id, query, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('createAppointment', function() {
//             /* jshint maxstatements: false */
//             var initialSites = [
//                 {
//                     _id: currentUser.currentSite,
//                     name: 'site1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1',
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                 }
//             ];
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 }
//             ];
//             var initialClients = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     firstName: 'client1'
//                 }
//             ];
//             var initialAppointments = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment1',
//                     appointmentTemplate: initialAppointmentTemplates[0]._id,
//                     start: moment('2015-01-01'),
//                     end: moment('2015-01-01').add(30, 'minutes'),
//                     duration: 30,
//                     color: 'red',
//                     note: 'note1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment2',
//                     start: moment('2015-02-01'),
//                     end: moment('2015-02-01').add(60, 'minutes'),
//                     duration: 30,
//                     color: 'green'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     appointmentTypeName: 'appointment3',
//                     appointmentTemplate: initialAppointmentTemplates[1]._id,
//                     start: moment('2015-03-01'),
//                     end: moment('2015-03-01').add(90, 'minutes'),
//                     duration: 90,
//                     color: 'blue'
//                 }
//             ];
            
//             function test(appointmentData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('client'), initialClients);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointment'), initialAppointments);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/appointments')
//                                 .send(appointmentData)
//                                 .expect(expectedStatus)
//                                 .expect('Content-Type', /json/)
//                                 .expect(function(res) {
//                                     testUtil.assert(res.body, expectedBody);
//                                 })
//                                 .end(function(err){
//                                     if (err) { return reject(err); }
//                                     resolve();
//                                 });
//                         });
//                     })
//                     .then(function() {
//                         done();
//                     })
//                     .catch(done);
//             }
            
//             function getBody(diff) {
//                 var body = {
//                     appointmentTypeName: 'appointment-new',
//                     appointmentTemplate: initialAppointmentTemplates[0]._id,
//                     resources: [initialResources[0]._id],
//                     clients: [initialClients[0]._id],
//                     start: moment('2020-01-01'),
//                     duration: 100,
//                     color: 'fff',
//                     note: 'note-new'
//                 };
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var appointmentData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var appointmentData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentTypeName, val=Missing'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.appointmentTypeName is empty', function(done) {
//                 var appointmentData = getBody({ appointmentTypeName: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentTypeName, val=Missing'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.appointmentTemplate is invalid', function(done) {
//                 var appointmentData = getBody({ appointmentTemplate: 'invalidId' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentTemplate, val=Invalid id'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start is empty', function(done) {
//                 var appointmentData = getBody({ start: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Missing or invalid date'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start is invalid', function(done) {
//                 var appointmentData = getBody({ start: 'invalidDate' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Missing or invalid date'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start in the past', function(done) {
//                 var appointmentData = getBody({ start: moment('2015-07-01') });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Can\'t create/update appointment in the past'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is empty', function(done) {
//                 var appointmentData = getBody({ duration: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is invalid', function(done) {
//                 var appointmentData = getBody({ duration: 'invalidNumber' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is less than 0', function(done) {
//                 var appointmentData = getBody({ duration: -5 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources are invalid', function(done) {
//                 var appointmentData = getBody({ resources: 'invalidArray' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources have invalid Id', function(done) {
//                 var appointmentData = getBody({ resources: [testUtil.ObjectId(), 'InvalidId'] });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.clients are invalid', function(done) {
//                 var appointmentData = getBody({ clients: 'invalidArray' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter clients, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.clients have invalid Id', function(done) {
//                 var appointmentData = getBody({ clients: [testUtil.ObjectId(), 'InvalidId'] });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter clients, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and create a new appointment when req.body is valid', function(done) {
//                 var appointmentData = getBody();
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: '_mock_',
//                     appointmentTypeName: 'appointment-new',
//                     appointmentTemplate: initialAppointmentTemplates[0]._id.toString(),
//                     resources: [initialResources[0]._id.toString()],
//                     clients: [initialClients[0]._id.toString()],
//                     start: moment('2020-01-01').toISOString(),
//                     end: moment('2020-01-01').add(100, 'minutes').toISOString(),
//                     duration: 100,
//                     color: 'fff',
//                     textColor: 'black',
//                     note: 'note-new'
//                 };
                
//                 ical.updateIcals.restore();
//                 sinon.stub(ical, 'updateIcals', function(appointment) { return appointment; });
                
//                 test(appointmentData, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('updateAppointment', function() {
//             /* jshint maxstatements: false */
//             var initialSites = [
//                 {
//                     _id: currentUser.currentSite,
//                     name: 'site1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1',
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                 }
//             ];
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 }
//             ];
//             var initialClients = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     firstName: 'client1'
//                 }
//             ];
//             var initialAppointments = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment1',
//                     appointmentTemplate: initialAppointmentTemplates[0]._id,
//                     start: moment('2020-01-01'),
//                     end: moment('2020-01-01').add(30, 'minutes'),
//                     duration: 30,
//                     color: 'red',
//                     note: 'note1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment2',
//                     start: moment('2020-02-01'),
//                     end: moment('2020-02-01').add(60, 'minutes'),
//                     duration: 30,
//                     color: 'green'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     appointmentTypeName: 'appointment3',
//                     appointmentTemplate: initialAppointmentTemplates[1]._id,
//                     start: moment('2020-03-01'),
//                     end: moment('2020-03-01').add(90, 'minutes'),
//                     duration: 90,
//                     color: 'blue'
//                 }
//             ];
            
//             function test(appointmentId, appointmentData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('client'), initialClients);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointment'), initialAppointments);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/appointments/' + appointmentId)
//                                 .send(appointmentData)
//                                 .expect(expectedStatus)
//                                 .expect('Content-Type', /json/)
//                                 .expect(function(res) {
//                                     testUtil.assert(res.body, expectedBody);
//                                 })
//                                 .end(function(err){
//                                     if (err) { return reject(err); }
//                                     resolve();
//                                 });
//                         });
//                     })
//                     .then(function() {
//                         done();
//                     })
//                     .catch(done);
//             }
            
//             function getBody(diff) {
//                 var body = _.pick(initialAppointments[0], [
//                     'appointmentTypeName', 'appointmentTemplate', 'clients',
//                     'resources', 'start', 'duration', 'color', 'textColor'
//                 ]);
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentTypeName, val=Missing'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.appointmentTypeName is empty', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ appointmentTypeName: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentTypeName, val=Missing'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.appointmentTemplate is invalid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ appointmentTemplate: 'invalidId' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentTemplate, val=Invalid id'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start is empty', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ start: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Missing or invalid date'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start is invalid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ start: 'invalidDate' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Missing or invalid date'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start in the past', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ start: moment('2015-07-01') });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Can\'t create/update appointment in the past'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is empty', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ duration: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is invalid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ duration: 'invalidNumber' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is less than 0', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ duration: -5 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources are invalid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ resources: 'invalidArray' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources have invalid Id', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ resources: [testUtil.ObjectId(), 'InvalidId'] });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.clients are invalid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ clients: 'invalidArray' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter clients, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.clients have invalid Id', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ clients: [testUtil.ObjectId(), 'InvalidId'] });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter clients, val=Invalid array or contains invalid id'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 404 when appointment is not found by req.params._id', function(done) {
//                 var appointmentId = testUtil.ObjectId();
//                 var appointmentData = getBody();
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'appointment not found'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and update an appointment when req.body is valid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({
//                     appointmentTypeName: 'appointment12',
//                     appointmentTemplate: null,
//                     resources: [],
//                     clients: [initialClients[0]._id],
//                     start: moment('2020-09-01'),
//                     duration: 10,
//                     color: 'ccc',
//                     note: 'note12'
//                 });
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: '_mock_',
//                     appointmentTypeName: 'appointment12',
//                     appointmentTemplate: null,
//                     resources: [],
//                     clients: [initialClients[0]._id.toString()],
//                     start: moment('2020-09-01').toISOString(),
//                     end: moment('2020-09-01').add(10, 'minutes').toISOString(),
//                     duration: 10,
//                     color: 'ccc',
//                     textColor: 'black',
//                     note: 'note12'
//                 };
                
//                 ical.updateIcals.restore();
//                 sinon.stub(ical, 'updateIcals', function(appointment) { return appointment; });
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('updateAppointmentDates', function() {
//             /* jshint maxstatements: false */
//             var initialSites = [
//                 {
//                     _id: currentUser.currentSite,
//                     name: 'site1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1',
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                 }
//             ];
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 }
//             ];
//             var initialClients = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     firstName: 'client1'
//                 }
//             ];
//             var initialAppointments = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment1',
//                     appointmentTemplate: initialAppointmentTemplates[0]._id,
//                     start: moment('2020-01-01'),
//                     end: moment('2020-01-01').add(30, 'minutes'),
//                     duration: 30,
//                     color: 'red',
//                     note: 'note1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     appointmentTypeName: 'appointment2',
//                     start: moment('2020-02-01'),
//                     end: moment('2020-02-01').add(60, 'minutes'),
//                     duration: 30,
//                     color: 'green'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     appointmentTypeName: 'appointment3',
//                     appointmentTemplate: initialAppointmentTemplates[1]._id,
//                     start: moment('2020-03-01'),
//                     end: moment('2020-03-01').add(90, 'minutes'),
//                     duration: 90,
//                     color: 'blue'
//                 }
//             ];
            
//             function test(appointmentId, appointmentData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('client'), initialClients);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointment'), initialAppointments);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/appointments/' + appointmentId + '/dates')
//                                 .send(appointmentData)
//                                 .expect(expectedStatus)
//                                 .expect('Content-Type', /json/)
//                                 .expect(function(res) {
//                                     testUtil.assert(res.body, expectedBody);
//                                 })
//                                 .end(function(err){
//                                     if (err) { return reject(err); }
//                                     resolve();
//                                 });
//                         });
//                     })
//                     .then(function() {
//                         done();
//                     })
//                     .catch(done);
//             }
            
//             function getBody(diff) {
//                 var body = _.pick(initialAppointments[0], ['start', 'end']);
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Missing or invalid date'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start is empty', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ start: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Missing or invalid date'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start is invalid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ start: 'invalidDate' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Missing or invalid date'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.start in the past', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ start: moment('2015-07-01') });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter start, val=Can\'t update appointment in the past'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.end is empty', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ end: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter end, val=Missing or invalid date'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.end is invalid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({ end: 'invalidDate' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter end, val=Missing or invalid date'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.end < req.body.start', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({
//                     start: moment('2020-06-01'),
//                     end: moment('2020-05-01')
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter end, val=End must be greater than Start'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 404 when appointment is not found by req.params._id', function(done) {
//                 var appointmentId = testUtil.ObjectId();
//                 var appointmentData = getBody();
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'appointment not found'
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and update appointment when req.body is valid', function(done) {
//                 var appointmentId = initialAppointments[0]._id;
//                 var appointmentData = getBody({
//                     start: moment('2020-09-01'),
//                     end: moment('2020-09-10'),
//                 });
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: '_mock_',
//                     start: moment('2020-09-01').toISOString(),
//                     end: moment('2020-09-10').toISOString(),
//                     duration: 12960
//                 };
                
//                 test(appointmentId, appointmentData, expectedStatus, expectedBody, done);
//             });
//         });
//     });
// });
