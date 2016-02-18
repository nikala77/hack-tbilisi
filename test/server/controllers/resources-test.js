// var _        = require('lodash');
// var request  = require('supertest');
// var Promise  = require('bluebird');
// var db       = require('mongoose');
// var sinon    = require('sinon');
// var app      = require('../../../server/app');
// var sync     = require('../../../server/util/sync');
// var testUtil = require('../../testUtil/test-util');

// describe('controllers', function() {
//     describe('resources', function() {
//         var currentUser = {
//             _id: testUtil.ObjectId(),
//             roles: ['admin'],
//             currentSite: testUtil.ObjectId()
//         };
        
//         before(function() {
//             sinon.stub(sync, 'writeToQueues', function() {}); // required to prevent object.save actions
//         });
        
//         beforeEach(function() {
//             testUtil.signIn(currentUser);
//         });
        
//         afterEach(function() {
//             testUtil.signOut();
//         });
        
//         after(function() {
//             sync.writeToQueues.restore();
//         });
        
//         describe('getResources', function() {
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
//             var initialUsers = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[0] }],
//                     email: 'user1@mail.com',
//                     firstName: 'user1',
//                     lastName: 'last1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[1] }],
//                     email: 'user2@mail.com'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[2] }],
//                     email: 'user3@mail.com'
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
//                     appointmentInterval: 12,
//                     practitioner: initialUsers[0]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'resource3',
//                     appointmentInterval: 13
//                 }
//             ];
            
//             function test(query, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('user'), initialUsers);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/resources/')
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
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test({}, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes is not an array', function(done) {
//                 var query = {
//                     includes: 'invalid include'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=' + query.includes
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.includes contains an invalid ref', function(done) {
//                 var query = {
//                     includes: ['invalid ref']
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter includes, val=' + query.includes
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.practitioner is not valid ObjectId', function(done) {
//                 var query = {
//                     practitioner: 'invalid ObjectId'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter practitioner, val=' + query.practitioner
//                 };
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and resources.json when req.query is empty', function(done) {
//                 var expectedStatus = 200;
//                 var expectedBody = [
//                     {
//                         _id: initialResources[0]._id,
//                         name: initialResources[0].name,
//                         appointmentInterval: initialResources[0].appointmentInterval,
//                     },
//                     {
//                         _id: initialResources[1]._id,
//                         name: initialResources[1].name,
//                         appointmentInterval: initialResources[1].appointmentInterval,
//                         practitioner: initialResources[1].practitioner._id.toString()
//                     }
//                 ];
                
//                 test({}, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and resources.json when req.query.practitioner=null', function(done) {
//                 var query = {
//                     practitioner: null
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = [
//                     {
//                         _id: initialResources[0]._id,
//                         name: initialResources[0].name,
//                         appointmentInterval: initialResources[0].appointmentInterval
//                     }
//                 ];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and resources.json when req.query.practitioner=practitioner', function(done) {
//                 var query = {
//                     practitioner: [initialUsers[0]._id.toString()]
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = [
//                     {
//                         _id: initialResources[1]._id,
//                         name: initialResources[1].name,
//                         appointmentInterval: initialResources[1].appointmentInterval,
//                         practitioner: initialResources[1].practitioner._id.toString()
//                     }
//                 ];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
            
//             /* jshint maxlen: 250 */
//             it('should return status 200 and resources.json when req.query.practitioner=practitioner & req.query.includes=[practitioner]', function(done) {
//                 var query = {
//                     includes: ['practitioner'],
//                     practitioner: [initialUsers[0]._id.toString()]
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = [
//                     {
//                         _id: initialResources[1]._id,
//                         name: initialResources[1].name,
//                         appointmentInterval: initialResources[1].appointmentInterval,
//                         practitioner: {
//                             _id: initialResources[1].practitioner._id.toString(),
//                             firstName: initialResources[1].practitioner.firstName,
//                             lastName: initialResources[1].practitioner.lastName
//                         }
//                     }
//                 ];
                
//                 test(query, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('getResourceById', function() {
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
//                     appointmentInterval: 11,
//                     regions: [
//                         { id: 1, name: 'reg1', bgColor: 'green', appointmentTemplates: [] },
//                         { id: 2, name: 'reg2', bgColor: 'red', appointmentTemplates: [] }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'resource2',
//                     appointmentInterval: 12,
//                     regions: [
//                         { id: 1, name: 'reg1', bgColor: 'green', appointmentTemplates: [] }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'resource3',
//                     appointmentInterval: 13
//                 }
//             ];
            
//             function test(resourceId, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/resources/' + resourceId)
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
//                 var resource = initialResources[0];
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(resource._id, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var resourceId = 'Invalid Id';
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=Invalid Id'
//                 };
                
//                 test(resourceId, expectedStatus, expectedBody, done);
//             });
           
//             it('should return status 404 when resource is not found by req.params._id', function(done) {
//                 var resourceId = testUtil.ObjectId();
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'resource not found'
//                 };
                
//                 test(resourceId, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and resource.json when resource with req.params._id is found', function(done) {
//                 var resource = initialResources[0];
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: resource._id,
//                     name: resource.name,
//                     appointmentInterval: resource.appointmentInterval,
//                     site: testUtil.currentUser.currentSite.toString(),
//                     status: 'Active',
//                     regions: resource.regions,
//                     hash: '_mock_',
//                     created: '_mock_'
//                 };
                
//                 test(resource._id, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('createResource', function() {
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
//                     site: initialSites[1],
//                     name: 'resource2',
//                     appointmentInterval: 12
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'resource3',
//                     appointmentInterval: 13
//                 }
//             ];
            
//             function test(resourceData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/resources')
//                                 .send(resourceData)
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
//                 var resourceData = {
//                     name: 'newResource1'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var resourceData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 test(resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.name is empty or invalid', function(done) {
//                 var resourceData = {
//                     appointmentInterval: 111
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 test(resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.appointmentInterval is empty or invalid', function(done) {
//                 var resourceData = {
//                     name: 'newResource1'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentInterval, val=undefined'
//                 };
                
//                 test(resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and create a new resource when req.body is valid', function(done) {
//                 var resourceData = {
//                     name: 'newResource1',
//                     appointmentInterval: 111
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     __v: '_mock_',
//                     _id: '_mock_',
//                     created: '_mock_',
//                     hash: '_mock_',
//                     lastEditedBy: '_mock_',
//                     site: testUtil.currentUser.currentSite.toString(),
//                     status: 'Active',
//                     name: resourceData.name,
//                     appointmentInterval: resourceData.appointmentInterval,
//                     regions: []
//                 };
                
//                 test(resourceData, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('updateResource', function() {
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
//                     site: initialSites[1],
//                     name: 'resource2',
//                     appointmentInterval: 12
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'resource3',
//                     appointmentInterval: 13
//                 }
//             ];
            
//             function test(resourceId, resourceData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/resources/' + resourceId)
//                                 .send(resourceData)
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
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = {
//                     name: 'updatedResource1'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var resourceId = 'InvalidId';
//                 var resourceData = {
//                     name: 'updatedResource1',
//                     appointmentInterval: 111
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=InvalidId'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.name is empty or invalid', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = {
//                     appointmentInterval: 111
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.appointmentInterval is empty or invalid', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = {
//                     name: 'updatedResource1'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter appointmentInterval, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 404 when resource is not found by req.params._id', function(done) {
//                 var resourceId = testUtil.ObjectId();
//                 var resourceData = {
//                     name: 'newResource1',
//                     appointmentInterval: 111
//                 };
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'resource not found'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and update a resource when req.body is valid', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = {
//                     name: 'updatedResource1',
//                     appointmentInterval: 222,
//                     description: 'updatedDescr'
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: '_mock_',
//                     created: '_mock_',
//                     hash: '_mock_',
//                     lastEditedBy: '_mock_',
//                     site: testUtil.currentUser.currentSite.toString(),
//                     status: 'Active',
//                     name: resourceData.name,
//                     appointmentInterval: resourceData.appointmentInterval,
//                     description: resourceData.description,
//                     regions: []
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('updateResourceRegions', function() {
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
//                     appointmentInterval: 11,
//                     regions: [
//                         { id: 1, name: 'reg1', bgColor: 'green', appointmentTemplates: [] },
//                         { id: 2, name: 'reg2', bgColor: 'red', appointmentTemplates: [] }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'resource2',
//                     appointmentInterval: 12,
//                     regions: [
//                         { id: 1, name: 'reg1', bgColor: 'green', appointmentTemplates: [] }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     name: 'resource3',
//                     appointmentInterval: 13
//                 }
//             ];
            
//             function test(resourceId, resourceData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/resources/' + resourceId + '/regions')
//                                 .send(resourceData)
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
//                     regions: initialResources[0].regions
//                 };
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var resourceId = 'InvalidId';
//                 var resourceData = getBody();
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=InvalidId'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter regions, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.regions is empty array', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = getBody({ regions: [] });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter regions, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.regions contains region with invalid id', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = getBody({
//                     regions: [
//                         { id: 0, name: 'reg1', bgColor: 'red', appointmentTemplates: [] },
//                         { name: 'reg2', bgColor: 'green', appointmentTemplates: [] }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter regions.id, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.regions contains region with invalid name', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = getBody({
//                     regions: [
//                         { id: 0, name: 'reg1', bgColor: 'red', appointmentTemplates: [] },
//                         { id: 1, bgColor: 'green', appointmentTemplates: [] }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter regions.name, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.regions contains region with invalid bgColor', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = getBody({
//                     regions: [
//                         { id: 0, name: 'reg1', bgColor: 'red', appointmentTemplates: [] },
//                         { id: 1, name: 'reg2', appointmentTemplates: [] }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter regions.bgColor, val=undefined'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.regions contains region with invalid appointmentTemplates', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = getBody({
//                     regions: [
//                         { id: 0, name: 'reg1', bgColor: 'red', appointmentTemplates: [testUtil.ObjectId()] },
//                         { id: 1, name: 'reg2', bgColor: 'green', appointmentTemplates: ['InvalidId'] }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter regions.appointmentTemplates, val=InvalidId'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 404 when resource is not found by req.params._id', function(done) {
//                 var resourceId = testUtil.ObjectId();
//                 var resourceData = getBody();
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'resource not found'
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and update a resource when req.body is valid', function(done) {
//                 var resourceId = initialResources[0]._id;
//                 var resourceData = getBody({
//                     regions: [{ id: 1, name: 'reg1', bgColor: 'green', appointmentTemplates: [] }]
//                 });
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: '_mock_',
//                     __v: '_mock_',
//                     created: '_mock_',
//                     hash: '_mock_',
//                     lastEditedBy: '_mock_',
//                     site: testUtil.currentUser.currentSite.toString(),
//                     status: 'Active',
//                     name: initialResources[0].name,
//                     appointmentInterval: initialResources[0].appointmentInterval,
//                     regions: [{ id: 1, name: 'reg1', bgColor: 'green', appointmentTemplates: [] }]
//                 };
                
//                 test(resourceId, resourceData, expectedStatus, expectedBody, done);
//             });
//         });
//     });
// });
