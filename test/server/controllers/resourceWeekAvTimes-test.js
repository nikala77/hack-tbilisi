// var _        = require('lodash');
// var request  = require('supertest');
// var Promise  = require('bluebird');
// var db       = require('mongoose');
// var should   = require('should');
// var app      = require('../../../server/app');
// var testUtil = require('../../testUtil/test-util');

// describe('controllers', function() {
//     describe('resourceWeekAvTimes', function() {
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
        
//         describe('getResourceWeekAvTimes', function() {
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
//                 }
//             ];
//             var initialResourceWeekAvTimes = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     resource: initialResources[0]._id,
//                     year: 2015,
//                     weeknumber: 5,
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 },
//                         { regionId: 1, weekday: 2, start: 10, end: 20 },
//                         { regionId: 2, weekday: 3, start: 10, end: 20 },
//                         { regionId: 2, weekday: 4, start: 10, end: 20 }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     resource: initialResources[0]._id,
//                     year: 2015,
//                     weeknumber: 25,
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 },
//                         { regionId: 1, weekday: 2, start: 10, end: 20 }
//                     ]
//                 }
//             ];
            
//             function test(params, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resourceWeekAvTimes'), initialResourceWeekAvTimes);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .get('/api/resourceWeekAvTimes?' + testUtil.buildQuery(params))
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
            
//             function getParams(diff) {
//                 var params = {
//                     resource: initialResources[0]._id.toString(),
//                     year: 2015,
//                     weeknumber: 1
//                 };
//                 return _.assign(params, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var params = getParams();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.resource is invalid', function(done) {
//                 var params = getParams({ resource: 'Invalid Id' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resource, val=Invalid Id'
//                 };
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.year is invalid', function(done) {
//                 var params = getParams({ year: 'Invalid year' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=NaN'
//                 };
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.year is less then 2015', function(done) {
//                 var params = getParams({ year: 2014 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=2014'
//                 };
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.year is greater then 2020', function(done) {
//                 var params = getParams({ year: 2021 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=2021'
//                 };
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.weeknumber is invalid', function(done) {
//                 var params = getParams({ weeknumber: 'Invalid weeknumber' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=NaN'
//                 };
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.weeknumber is less than 0', function(done) {
//                 var params = getParams({ weeknumber: -1 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=-1'
//                 };
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.query.weeknumber is greater than 53', function(done) {
//                 var params = getParams({ weeknumber: 54 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=54'
//                 };
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and resourceWeekAvTimes.json when resourceWeekAvTimes is found by req.query', function(done) {
//                 var params = getParams({ weeknumber: 5 });
//                 var expectedStatus = 200;
//                 var expectedBody = _.pick(initialResourceWeekAvTimes[0], ['_id', 'year', 'weeknumber', 'blocks', 'resource']);
//                 expectedBody.resource = expectedBody.resource.toString();
                
//                 test(params, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('saveResourceWeekAvTimes', function() {
//             /* jshint maxstatements : false */
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
//                 }
//             ];
//             var initialResourceWeekAvTimes = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     resource: initialResources[0]._id,
//                     year: 2015,
//                     weeknumber: 5,
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 },
//                         { regionId: 1, weekday: 2, start: 10, end: 20 },
//                         { regionId: 2, weekday: 3, start: 10, end: 20 },
//                         { regionId: 2, weekday: 4, start: 10, end: 20 }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     resource: initialResources[0]._id,
//                     year: 2015,
//                     weeknumber: 25,
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 },
//                         { regionId: 1, weekday: 2, start: 10, end: 20 }
//                     ]
//                 }
//             ];
            
//             function test(resourceWeekAvTimesData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resourceWeekAvTimes'), initialResourceWeekAvTimes);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/resourceWeekAvTimes')
//                                 .send(resourceWeekAvTimesData)
//                                 .expect(expectedStatus)
//                                 .expect(function(res) {
//                                     if (expectedStatus !== 200) {
//                                         should(res.headers['content-type']).be.match(/json/);
//                                     }
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
//                     resource: initialResources[0]._id.toString(),
//                     year: 2015,
//                     weeknumber: 1,
//                     blocks: initialResourceWeekAvTimes[0].blocks
//                 };
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var resourceWatData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var resourceWatData = {};
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resource, val=undefined'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resource is invalid', function(done) {
//                 var resourceWatData = getBody({ resource: 'Invalid Id' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resource, val=Invalid Id'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.year is invalid', function(done) {
//                 var resourceWatData = getBody({ year: 'Invalid year' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=NaN'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.year is less then 2015', function(done) {
//                 var resourceWatData = getBody({ year: 2014 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=2014'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.year is greater then 2020', function(done) {
//                 var resourceWatData = getBody({ year: 2021 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=2021'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.weeknumber is invalid', function(done) {
//                 var resourceWatData = getBody({ weeknumber: 'Invalid weeknumber' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=NaN'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.weeknumber is less than 0', function(done) {
//                 var resourceWatData = getBody({ weeknumber: -1 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=-1'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.weeknumber is greater than 53', function(done) {
//                 var resourceWatData = getBody({ weeknumber: 54 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=54'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with empty regionId', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { weekday: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.regionId, val=undefined'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with invalid regionId', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { regionId: -1, weekday: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.regionId, val=-1'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with empty weekday', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { regionId: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.weekday, val=undefined'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with invalid weekday', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { regionId: 1, weekday: 10, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.weekday, val=10'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with empty start', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { regionId: 1, weekday: 1, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.start, val=undefined'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with invalid start', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10000, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.start, val=10000'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with empty end', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.end, val=undefined'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.blocks contains block with invalid end', function(done) {
//                 var resourceWatData = getBody({
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10, end: 20000 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter blocks.end, val=20000'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             /* jshint maxlen: 250 */
//             it('should return status 200 and create a new resourceWeekAvTimes when req.body is valid and resourceWeekAvTimes is not found by req.query', function(done) {
//                 var resourceWatData = getBody({ year: 2016 });
//                 var expectedStatus = 200;
//                 var expectedBody = {};
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             /* jshint maxlen: 250 */
//             it('should return status 200 and update a resourceWeekAvTimes when req.body is valid and resourceWeekAvTimes is found by req.query', function(done) {
//                 var resourceWatData = getBody();
//                 var expectedStatus = 200;
//                 var expectedBody = {};
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('cloneResourceWeekAvTimes', function() {
//             /* jshint maxstatements : false */
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
//                 }
//             ];
//             var initialResourceWeekAvTimes = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     resource: initialResources[0]._id,
//                     year: 2020,
//                     weeknumber: 35,
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10, end: 20 }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     resource: initialResources[0]._id,
//                     year: 2020,
//                     weeknumber: 25,
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 10, end: 20 },
//                         { regionId: 1, weekday: 1, start: 50, end: 90 },
//                         { regionId: 1, weekday: 2, start: 10, end: 20 }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[0],
//                     resource: initialResources[0]._id,
//                     year: 2015,
//                     weeknumber: 25,
//                     blocks: [
//                         { regionId: 1, weekday: 1, start: 50, end: 90 }
//                     ]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     site: initialSites[1],
//                     resource: initialResources[1]._id,
//                     year: 2015,
//                     weeknumber: 25,
//                     blocks: [
//                         { regionId: 1, weekday: 2, start: 10, end: 20 }
//                     ]
//                 }
//             ];
            
//             function test(resourceWeekAvTimesData, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('site'), initialSites)
//                     .then(function() {
//                         return testUtil.save(db.model('resource'), initialResources);
//                     })
//                     .then(function() {
//                         return testUtil.save(db.model('resourceWeekAvTimes'), initialResourceWeekAvTimes);
//                     })
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/api/resourceWeekAvTimes/clone')
//                                 .send(resourceWeekAvTimesData)
//                                 .expect(expectedStatus)
//                                 .expect(function(res) {
//                                     if (expectedStatus !== 200) {
//                                         should(res.headers['content-type']).be.match(/json/);
//                                     }
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
//                     resource: initialResources[0]._id.toString(),
//                     year: 2020,
//                     weeknumber: 35
//                 };
//                 return _.assign(body, diff);
//             }
            
//             it('should return status 401 when user isn\'t authenticated', function(done) {
//                 var resourceWatData = getBody();
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'Request must have Authorization header'
//                 };
                
//                 testUtil.signOut();
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body is empty', function(done) {
//                 var resourceWatData = {};
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resource, val=undefined'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.resource is invalid', function(done) {
//                 var resourceWatData = getBody({ resource: 'Invalid Id' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter resource, val=Invalid Id'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.year is invalid', function(done) {
//                 var resourceWatData = getBody({ year: 'Invalid year' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=NaN'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.year is less then 2015', function(done) {
//                 var resourceWatData = getBody({ year: 2014 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=2014'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.year is greater then 2020', function(done) {
//                 var resourceWatData = getBody({ year: 2021 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter year, val=2021'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.weeknumber is invalid', function(done) {
//                 var resourceWatData = getBody({ weeknumber: 'Invalid weeknumber' });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=NaN'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.weeknumber is less than 0', function(done) {
//                 var resourceWatData = getBody({ weeknumber: -1 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=-1'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 422 when req.body.weeknumber is greater than 53', function(done) {
//                 var resourceWatData = getBody({ weeknumber: 54 });
//                 var expectedStatus = 422;
//                 var expectedBody = {
//                     reason: 'Invalid parameter weeknumber, val=54'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 404 when resourceWeekAvTimes is not found by req.query', function(done) {
//                 var resourceWatData = getBody({ year: 2016 });
//                 var expectedStatus = 404;
//                 var expectedBody = {
//                     reason: 'resourceWeekAvTimes not found'
//                 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 and clone a resourceWeekAvTimes when req.body is valid', function(done) {
//                 var resourceWatData = getBody();
//                 var expectedStatus = 200;
//                 var expectedBody = { createdResouceWeekAvTimes: 18 };
                
//                 test(resourceWatData, expectedStatus, expectedBody, done);
//             });
//         });
//     });
// });
