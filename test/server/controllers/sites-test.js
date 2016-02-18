// var request  = require('supertest');
// var Promise  = require('bluebird');
// var db       = require('mongoose');
// var app      = require('../../../server/app');
// var testUtil = require('../../testUtil/test-util');

// describe('controllers', function() {
//     describe('sites', function() {
//         afterEach(function() {
//             testUtil.signOut();
//         });
        
//         describe('getSites', function() {
//             var initialSites = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site1'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site3'
//                 }
//             ];
//             var initialUsers = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[0], roles: ['owner'] }, { site: initialSites[1] }],
//                     email: 'user1@mail.com',
//                     firstName: 'f1',
//                     lastName: 'l1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[1], roles: ['owner'] }],
//                     email: 'user2@mail.com',
//                     firstName: 'f2',
//                     lastName: 'l2'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[2] }],
//                     email: 'user3@mail.com',
//                     firstName: 'f3',
//                     lastName: 'l3'
//                 }
//             ];
            
//             function test(query, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('user'), initialUsers);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/sites/')
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
            
//             it('should return status 401 when currentUser isn\'t authenticated', function(done) {
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 test({}, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and sites.json when currentUser=#1', function(done) {
//                 var expectedStatus = 200;
//                 var expectedBody = [
//                     {
//                         _id: initialSites[0]._id,
//                         name: initialSites[0].name,
//                         isOwner: true
//                     },
//                     {
//                         _id: initialSites[1]._id,
//                         name: initialSites[1].name
//                     }
//                 ];
                
//                 testUtil.signIn(initialUsers[0]);
//                 test({}, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and sites.json when currentUser=#2', function(done) {
//                 var expectedStatus = 200;
//                 var expectedBody = [
//                     {
//                         _id: initialSites[1]._id,
//                         name: initialSites[1].name,
//                         isOwner: true
//                     }
//                 ];
                
//                 testUtil.signIn(initialUsers[1]);
//                 test({}, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('getSiteById', function() {
//             var initialSites = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site1',
//                     pic: 's3'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site3'
//                 }
//             ];
//             var initialUsers = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     roles: ['owner'],
//                     siteRoles: [{ site: initialSites[0], roles: ['owner'] }, { site: initialSites[1] }],
//                     currentSite: initialSites[0],
//                     email: 'user1@mail.com',
//                     firstName: 'f1',
//                     lastName: 'l1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     roles: ['owner'],
//                     siteRoles: [{ site: initialSites[0] }, { site: initialSites[1], roles: ['owner'] }],
//                     currentSite: initialSites[1],
//                     email: 'user2@mail.com',
//                     firstName: 'f2',
//                     lastName: 'l2'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[2] }],
//                     currentSite: initialSites[2],
//                     email: 'user3@mail.com',
//                     firstName: 'f3',
//                     lastName: 'l3'
//                 }
//             ];
            
//             function test(siteId, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('user'), initialUsers);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/sites/' + siteId)
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
            
//             it('should return status 401 when currentUser isn\'t authenticated', function(done) {
//                 var site = initialSites[0];
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 test(site._id, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 403 when currentUser isn\'t autorized', function(done) {
//                 var site = initialSites[0];
//                 var expectedStatus = 403;
//                 var expectedBody = {};
                
//                 testUtil.signIn(initialUsers[2]);
//                 test(site._id, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var siteId = 'Invalid Id';
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=Invalid Id'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, expectedStatus, expectedBody, done);
//             });
           
//             it('should return status 404 when site is not found by req.params._id', function(done) {
//                 var siteId = testUtil.ObjectId();
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'site not found'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and site.json when site is found by req.params._id', function(done) {
//                 var site = initialSites[0];
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: site._id,
//                     name: site.name,
//                     pic: 's3',
//                     created: '_mock_'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(site._id, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('createSite', function() {
//             var initialSites = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site1',
//                     pic: 's3'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site3'
//                 }
//             ];
//             var initialUsers = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     roles: ['owner'],
//                     siteRoles: [{ site: initialSites[0], roles: ['owner'] }, { site: initialSites[1] }],
//                     currentSite: initialSites[0],
//                     email: 'user1@mail.com',
//                     firstName: 'f1',
//                     lastName: 'l1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     roles: ['owner'],
//                     siteRoles: [{ site: initialSites[0] }, { site: initialSites[1], roles: ['owner'] }],
//                     currentSite: initialSites[1],
//                     email: 'user2@mail.com',
//                     firstName: 'f2',
//                     lastName: 'l2'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[2] }],
//                     currentSite: initialSites[2],
//                     email: 'user3@mail.com',
//                     firstName: 'f3',
//                     lastName: 'l3'
//                 }
//             ];
            
//             function test(siteData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('user'), initialUsers);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/sites')
//                                 .send(siteData)
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
            
//             it('should return status 401 when currentUser isn\'t authenticated', function(done) {
//                 var siteData = {
//                     name: 'newSite1'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 test(siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var siteData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.name is empty or invalid', function(done) {
//                 var siteData = {};
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.email is invalid', function(done) {
//                 var siteData = {
//                     name: 'newSite1',
//                     email: 'InvalidEmail'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter email, val=' + siteData.email
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and create a new site when req.body is valid', function(done) {
//                 var siteData = {
//                     name: 'newSite1',
//                     email: 'newSiteEmail1@mail.comn'
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     __v: '_mock_',
//                     _id: '_mock_',
//                     created: '_mock_',
//                     name: siteData.name,
//                     email: siteData.email
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteData, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('updateSite', function() {
//             var initialSites = [
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site1',
//                     pic: 's3'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site2'
//                 },
//                 {
//                     _id: testUtil.ObjectId(),
//                     name: 'site3'
//                 }
//             ];
//             var initialUsers = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     roles: ['owner'],
//                     siteRoles: [{ site: initialSites[0], roles: ['owner'] }, { site: initialSites[1] }],
//                     currentSite: initialSites[0],
//                     email: 'user1@mail.com',
//                     firstName: 'f1',
//                     lastName: 'l1'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     roles: ['owner'],
//                     siteRoles: [{ site: initialSites[0] }, { site: initialSites[1], roles: ['owner'] }],
//                     currentSite: initialSites[1],
//                     email: 'user2@mail.com',
//                     firstName: 'f2',
//                     lastName: 'l2'
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     siteRoles: [{ site: initialSites[2] }],
//                     currentSite: initialSites[2],
//                     email: 'user3@mail.com',
//                     firstName: 'f3',
//                     lastName: 'l3'
//                 }
//             ];
            
//             function test(siteId, siteData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('user'), initialUsers);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .put('/api/sites/' + siteId)
//                                 .send(siteData)
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
            
//             it('should return status 401 when currentUser isn\'t authenticated', function(done) {
//                 var siteId = initialSites[0]._id;
//                 var siteData = {
//                     name: 'updatedSite1'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 403 when currentUser isn\'t autorized', function(done) {
//                 var siteId = initialSites[0]._id;
//                 var siteData = {
//                     name: 'updatedSite1'
//                 };
//                 var expectedStatus = 403;
//                 var expectedBody = {};
                
//                 testUtil.signIn(initialUsers[2]);
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.params._id is invalid', function(done) {
//                 var siteId = 'InvalidId';
//                 var siteData = {
//                     name: 'updatedSite1'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter _id, val=InvalidId'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var siteId = initialSites[0]._id;
//                 var siteData;
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.name is empty or invalid', function(done) {
//                 var siteId = initialSites[0]._id;
//                 var siteData = {};
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter name, val=undefined'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.email is invalid', function(done) {
//                 var siteId = initialSites[0]._id;
//                 var siteData = {
//                     name: 'updatedSite1',
//                     email: 'InvalidEmail'
//                 };
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter email, val=' + siteData.email
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 404 when site is found by req.params._id', function(done) {
//                 var siteId = testUtil.ObjectId();
//                 var siteData = {
//                     name: 'updatedSite1'
//                 };
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'site not found'
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and update a site when req.body is valid', function(done) {
//                 var siteId = initialSites[0]._id;
//                 var siteData = {
//                     name: 'updatedSite1',
//                     email: 'updatedSite1@mail.com'
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     _id: siteId,
//                     name: siteData.name,
//                     email: siteData.email
//                 };
                
//                 testUtil.signIn(initialUsers[0]);
//                 test(siteId, siteData, expectedStatus, expectedBody, done);
//             });
//         });
//     });
// });
