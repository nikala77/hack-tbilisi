// var _        = require('lodash');
// var request  = require('supertest');
// var Promise  = require('bluebird');
// var db       = require('mongoose');
// var app      = require('../../../server/app');
// var testUtil = require('../../testUtil/test-util');

// describe('controllers', function() {
//     describe('appointmentTemplates', function() {
//         var currentUser = {
//             _id: testUtil.ObjectId(),
//             roles: ['admin'],
//             currentSite: testUtil.ObjectId()
//         };
        
//         beforeEach(function() {
//             testUtil.signIn(currentUser);
//         });
        
//         afterEach(function() {
//             testUtil.signOut();
//         });
        
//         describe('getAppointmentTemplatess', function() {
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
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource2',
//                     appointmentInterval: 22
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                     resources: [initialResources[0], initialResources[1]]
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'at3',
//                 }
//             ];
            
//             function test(query, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/appointmentTemplates/')
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
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var query = {};
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes is not array', function(done) {
//                 var query = {
//                     includes: 'invalid includes'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes contains invalid ref', function(done) {
//                 var query = {
//                     includes: ['invalid ref', 'resources']
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointmentTemplates.json when req.query is valid', function(done) {
//                 var query = {};
//                 var expectedStatus = 200;
//                 var at1 = initialAppointmentTemplates[0];
//                 var at2 = initialAppointmentTemplates[1];
//                 var expectedBody = [
//                     {
//                         _id: at1._id.toString(),
//                         name: at1.name,
//                         resources: [],
//                         color: '#39CCCC',
//                         textColor: 'black',
//                         duration: 10
//                     },
//                     {
//                         _id: at2._id.toString(),
//                         name: at2.name,
//                         resources: [at2.resources[0]._id.toString(), at2.resources[1]._id.toString()],
//                         color: '#39CCCC',
//                         textColor: 'black',
//                         duration: 10
//                     }
//                 ];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointmentTemplates.json when req.query.includes=[resources]', function(done) {
//                 var query = {
//                     includes: ['resources']
//                 };
//                 var expectedStatus = 200;
//                 var at1 = initialAppointmentTemplates[0];
//                 var at2 = initialAppointmentTemplates[1];
//                 var expectedBody = [
//                     {
//                         _id: at1._id.toString(),
//                         name: at1.name,
//                         resources: [],
//                         color: '#39CCCC',
//                         textColor: 'black',
//                         duration: 10
//                     },
//                     {
//                         _id: at2._id.toString(),
//                         name: at2.name,
//                         resources: [
//                             {
//                                 _id: at2.resources[0]._id.toString(),
//                                 name: at2.resources[0].name
//                             },
//                             {
//                                 _id: at2.resources[1]._id.toString(),
//                                 name: at2.resources[1].name
//                             }
//                         ],
//                         color: '#39CCCC',
//                         textColor: 'black',
//                         duration: 10
//                     }
//                 ];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('getAppointmentTemplateById', function() {
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
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource2',
//                     appointmentInterval: 22
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                     resources: [initialResources[0], initialResources[1]]
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'at3',
//                 }
//             ];
            
//             function test(atId, query, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/appointmentTemplates/' + atId)
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
//                 var at = initialAppointmentTemplates[0];
//                 var query = {};
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(at._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var atId = 'Invalid Id';
//                 var query = {};
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=Invalid id'
//                 };
                
//                 test(atId, query, expectedStatus, expectedBody, done);
//             });
           
//             it('should return status 404 when appointmentTemplate is not found by req.params._id', function(done) {
//                 var atId = testUtil.ObjectId();
//                 var query = {};
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'appointmentTemplate not found'
//                 };
                
//                 test(atId, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes is not array', function(done) {
//                 var at = initialAppointmentTemplates[0];
//                 var query = {
//                     includes: 'invalid includes'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(at._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes contains invalid ref', function(done) {
//                 var at = initialAppointmentTemplates[0];
//                 var query = {
//                     includes: ['invalid ref', 'resources']
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=Invalid array or contains invalid ref'
//                 };
                
//                 test(at._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointmentTemplates.json when req.query is valid', function(done) {
//                 var at = initialAppointmentTemplates[0];
//                 var query = {};
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: at._id.toString(),
//                     name: at.name,
//                     resources: [],
//                     color: '#39CCCC',
//                     textColor: 'black',
//                     duration: 10
//                 };
                
//                 test(at._id, query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and appointmentTemplates.json when req.query.includes=[resources]', function(done) {
//                 var at = initialAppointmentTemplates[1];
//                 var query = {
//                     includes: ['resources']
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: at._id.toString(),
//                     name: at.name,
//                     resources: [
//                         {
//                             _id: at.resources[0]._id.toString(),
//                             name: at.resources[0].name
//                         },
//                         {
//                             _id: at.resources[1]._id.toString(),
//                             name: at.resources[1].name
//                         }
//                     ],
//                     color: '#39CCCC',
//                     textColor: 'black',
//                     duration: 10
//                 };
                
//                 test(at._id, query, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('createAppointmentTemplate', function() {
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
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource2',
//                     appointmentInterval: 22
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                     resources: [initialResources[0], initialResources[1]]
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'at3',
//                 }
//             ];
            
//             function test(atData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/appointmentTemplates')
//                                 .send(atData)
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
//                     name: 'at-new',
//                     resources: [initialResources[0]._id],
//                     color: 'red',
//                     duration: 15
//                 };
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var atData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var atData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=Missing'
//                 };
                
//                 test(atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.name is empty', function(done) {
//                 var atData = getBody({ name: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=Missing'
//                 };
                
//                 test(atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is invalid', function(done) {
//                 var atData = getBody({ duration: 'invalidNumber' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is less than 0', function(done) {
//                 var atData = getBody({ duration: -5 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources are invalid', function(done) {
//                 var atData = getBody({ resources: 'invalidArray' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources have invalid Id', function(done) {
//                 var atData = getBody({ resources: [testUtil.ObjectId(), 'InvalidId'] });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and create a new appointment when req.body is valid', function(done) {
//                 var atData = getBody();
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: '_mock_',
//                     name: 'at-new',
//                     resources: [initialResources[0]._id.toString()],
//                     duration: 15,
//                     color: 'red',
//                     textColor: 'black'
//                 };
                
//                 test(atData, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('updateAppointmentTemplate', function() {
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
//             var initialResources = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource1',
//                     appointmentInterval: 11
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'resource2',
//                     appointmentInterval: 22
//                 }
//             ];
//             var initialAppointmentTemplates = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     name: 'at2',
//                     resources: [initialResources[0], initialResources[1]]
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'at3',
//                 }
//             ];
            
//             function test(atId, atData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('appointmentTemplate'), initialAppointmentTemplates);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/appointmentTemplates/' + atId)
//                                 .send(atData)
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
//                     name: 'at-new',
//                     resources: [initialResources[0]._id],
//                     color: 'red',
//                     duration: 15
//                 };
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var atId = 'Invalid Id';
//                 var atData = getBody();
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=Invalid id'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
           
//             it('should return status 404 when appointmentTemplate is not found by req.params._id', function(done) {
//                 var atId = testUtil.ObjectId();
//                 var atData = getBody();
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'appointmentTemplate not found'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=Missing'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.name is empty', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData = getBody({ name: undefined });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=Missing'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is invalid', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData = getBody({ duration: 'invalidNumber' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.duration is less than 0', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData = getBody({ duration: -5 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter duration, val=Invalid number or less than 0'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources are invalid', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData = getBody({ resources: 'invalidArray' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resources have invalid Id', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData = getBody({ resources: [testUtil.ObjectId(), 'InvalidId'] });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resources, val=Invalid array or contains invalid id'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and create a new appointment when req.body is valid', function(done) {
//                 var atId = initialAppointmentTemplates[0]._id;
//                 var atData = getBody({
//                     name: 'at12',
//                     resources: [initialResources[0]._id.toString()],
//                     duration: 25,
//                     color: 'pink'
//                 });
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: atId.toString(),
//                     name: 'at12',
//                     resources: [initialResources[0]._id.toString()],
//                     duration: 25,
//                     color: 'pink',
//                     textColor: 'black'
//                 };
                
//                 test(atId, atData, expectedStatus, expectedBody, done);
//             });
//         });
//     });
// });
