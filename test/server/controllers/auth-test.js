// var Promise   = require('bluebird');
// var db        = require('mongoose');
// var moment    = require('moment');
// var jwt       = require('jwt-simple');
// var request   = require('supertest');
// var sinon     = require('sinon');
// var should    = require('should');
// var config    = require('../../../config/environment');
// var app       = require('../../../server/app');
// var auth      = require('../../../server/controllers/auth');
// var encrypt   = require('../../../server/util/encryption');
// var httpUtil  = require('../../../server/util/httpUtil');
// var errorUtil = require('../../../server/util/errorUtil');
// var testUtil  = require('../../testUtil/test-util');

// /*jshint expr: true */

// describe('controllers', function() {
//     describe('auth', function() {
        
//         describe('ensureAuthenticated', function() {
//             var httpUtilStub;
//             before(function() {
//                 sinon.stub(jwt, 'decode')
//                     .withArgs(undefined)
//                     .throws(new Error('Invalid token'))
//                     .withArgs('expired_token', config.TOKEN_SECRET)
//                     .returns({ exp: moment().subtract(5, 'days').unix(), sub: {} })
//                     .withArgs('unexpired_token', config.TOKEN_SECRET)
//                     .returns({ exp: moment().add(5, 'days').unix(), sub: {} });
              
//                 httpUtilStub = sinon.stub(httpUtil, 'processError');
//             });
            
//             afterEach(function() {
//                 httpUtilStub.reset();
//             });
          
//             after(function() {
//                 jwt.decode.restore();
//                 httpUtil.processError.restore();
//             });
          
//             function test(req, expectedErr) {
//                 var res = {};
//                 var next = function() {
//                     should(expectedErr).be.not.ok;
//                 };
//                 auth.ensureAuthenticated(req, res, next);
                
//                 if (expectedErr) {
//                     should(httpUtilStub.calledOnce).be.true;
//                     should(httpUtilStub.calledWithExactly(expectedErr, 'json', res, next)).be.true;
//                 } else {
//                     should(httpUtilStub.called).be.false;
//                 }
//             }
          
//             it('should throw UnauthorizedError when request isn\'t contains Authorization header', function() {
//                 var req = {
//                     headers: {}
//                 };
//                 var expectedErr = errorUtil.getUnauthorizedError('Request must have Authorization header');
                
//                 test(req, expectedErr);
//             });
          
//             it('should throw UnauthorizedError when request Authorization header is not valid', function() {
//                 var req = {
//                   headers: {
//                       authorization: 'invalid-header'
//                   }
//                 };
//                 var expectedErr = errorUtil.getUnauthorizedError('Token malformed');
                
//                 test(req, expectedErr);
//             });
          
//             it('should throw UnauthorizedError when request Authorization header is valid and payload is expired', function() {
//                 var req = {
//                   headers: {
//                       authorization: 'authorization: expired_token'
//                   }
//                 };
//                 var expectedErr = errorUtil.getUnauthorizedError('Token has expired');
                
//                 test(req, expectedErr);
//             });
          
//             it('should call next when request Authorization header is valid and payload isn\'t expired', function() {
//                 var req = {
//                   headers: {
//                       authorization: 'authorization: unexpired_token'
//                   }
//                 };
                
//                 test(req);
//             });
//         });
        
//         describe('refreshJwt', function() {
//             before(function() {
//                 sinon.stub(jwt, 'encode').returns('encoded_string');
//             });
            
//             after(function() {
//                 jwt.encode.restore();
//             });
            
//             /* jshint camelcase: false */
//             var currentSite = testUtil.ObjectId();
//             var initialUsers = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     email: 'user1@mail.com',
//                     currentSite: currentSite,
//                     siteRoles: [{ site: currentSite, roles: ['owner'] }]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     email: 'user2@mail.com',
//                     currentSite: currentSite,
//                     siteRoles: [{ site: currentSite, roles: ['owner', 'admin'] }]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     email: 'user3@mail.com',
//                     currentSite: currentSite,
//                     siteRoles: [{ site: currentSite, roles: ['user'] }]
//                 }
//             ];
            
//             function test(id, expectedData, expectedErr, done) {
//                 var req = { user: { _id: id } };
//                 var res = {
//                     send: function(data) {
//                         should(data).be.ok;
//                         should(data).have.properties({ jwt: expectedData.jwt });
//                         should(data.user).have.properties({
//                             _id: expectedData.user._id.toString(),
//                             displayName: expectedData.user.email
//                         });
//                     }
//                 };
//                 testUtil
//                     .save(db.model('user'), initialUsers)
//                     .then(function() {
//                         return auth.refreshJwt(req, res);
//                     })
//                     .then(function() {
//                         done();
//                     }, function(err) {
//                         if (err.name !== 'AssertionError') {
//                             should(expectedData).be.null;
//                             should(err).be.eql(expectedErr);
//                             done();
//                         } else {
//                             done(err);
//                         }
//                     })
//                     .catch(done);
//             }
            
//             it('should return status 500 when user isn\'t found by id', function(done) {
//                 var id = testUtil.ObjectId();
//                 var expectedData = null;
//                 var expectedErr = { message: 'User not found', name: 'ObjectNotFoundError' };
                
//                 test(id, expectedData, expectedErr, done);
//             });
            
//             it('should return status 200 and user when user is found by id', function(done) {
//                 var id = initialUsers[0]._id;
//                 var expectedData = {
//                     jwt: 'encoded_string',
//                     user: initialUsers[0]
//                 };
//                 var expectedErr = null;
                
//                 test(id, expectedData, expectedErr, done);
//             });
//         });
        
//         describe('login', function () {
//             before(function() {
//                 sinon
//                     .stub(encrypt, 'hashPwd')
//                     .withArgs('salt', 'correct_pass')
//                     .returns('hashed_pwd')
//                     .withArgs('salt', 'incorrect_pass')
//                     .returns('hashed_pwd2');
//                 sinon
//                     .stub(encrypt, 'decodeApiKey')
//                     .withArgs('correct_apikey')
//                     .returns({ email: 'user1@mail.com', password: 'correct_pass' })
//                     .withArgs('incorrect_apikey')
//                     .throws(new Error('Invalid key'));
//                 sinon.stub(jwt, 'encode').returns('encoded_string');
//             });
            
//             after(function() {
//                 encrypt.hashPwd.restore();
//                 encrypt.decodeApiKey.restore();
//                 jwt.encode.restore();
//             });
            
//             /* jshint camelcase: false */
//             var currentSite = testUtil.ObjectId();
//             var initialUsers = [
//                 { 
//                     _id: testUtil.ObjectId(),
//                     email: 'user1@mail.com',
//                     hashed_pwd: 'hashed_pwd',
//                     salt: 'salt',
//                     verified: moment().subtract(10, 'days'),
//                     currentSite: currentSite,
//                     siteRoles: [{ site: currentSite, roles: ['owner'] }]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     email: 'user2@mail.com',
//                     hashed_pwd: 'hashed_pwd',
//                     salt: 'salt',
//                     verified: moment().subtract(10, 'days'),
//                     disabled: true,
//                     currentSite: currentSite,
//                     siteRoles: [{ site: currentSite, roles: ['owner', 'admin'] }]
//                 },
//                 { 
//                     _id: testUtil.ObjectId(),
//                     email: 'user3@mail.com',
//                     hashed_pwd: 'hashed_pwd',
//                     salt: 'salt',
//                     currentSite: currentSite,
//                     siteRoles: [{ site: currentSite, roles: ['user'] }]
//                 }
//             ];
            
//             function test(users, data, expectedStatus, expectedBody, done) {
//                 testUtil
//                     .save(db.model('user'), users)
//                     .then(function() {
//                         return new Promise(function(resolve, reject) {
//                             request(app)
//                                 .post('/login')
//                                 .send(data)
//                                 .expect(expectedStatus)
//                                 .expect('Content-Type', /json/)
//                                 .expect(function(res) {
//                                     if (expectedBody.jwt || expectedBody.user) {
//                                         testUtil.assert(res.body.jwt, expectedBody.jwt);
//                                         testUtil.assert(res.body.user, expectedBody.user);
//                                     } else {
//                                         testUtil.assert(res.body, expectedBody);
//                                     }
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
            
//             it('should return status 401 when apiKey is malformed', function (done) {
//                 var data = {
//                     apiKey: 'incorrect_apikey'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'apiKey malformed',
//                     info: {
//                         status: 'apiKey malformed',
//                         userId: '',
//                         displayName: '',
//                         email: ''
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 401 when email is empty', function (done) {
//                 var data = {
//                     password: 'correct_pass'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'invalid un/pw',
//                     info: {
//                         status: 'invalid un/pw',
//                         userId: '',
//                         displayName: '',
//                         email: ''
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 401 when pass is empty', function (done) {
//                 var user = initialUsers[0];
//                 var data = {
//                     email: user.email
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'invalid un/pw',
//                     info: {
//                         status: 'invalid un/pw',
//                         userId: '',
//                         displayName: '',
//                         email: ''
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 401 when email isn\'t registered', function (done) {
//                 var data = {
//                     email: 'NOT REGISTERED EMAIL',
//                     password: 'correct_pass'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'invalid un/pw',
//                     info: {
//                         status: 'invalid un/pw',
//                         userId: '',
//                         displayName: '',
//                         email: ''
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 401 when user is disabled', function (done) {
//                 var user = initialUsers[1];
//                 var data = {
//                     email: user.email,
//                     password: 'correct_pass'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'disabled',
//                     info: {
//                         status: 'disabled',
//                         userId: user._id.toString(),
//                         email: user.email
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 401 when email isn\'t verified', function (done) {
//                 var user = initialUsers[2];
//                 var data = {
//                     email: user.email,
//                     password: 'correct_pass'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'un-verified user',
//                     info: {
//                         status: 'un-verified user',
//                         userId: user._id.toString(),
//                         email: user.email
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 401 when password is incorrect', function (done) {
//                 var user = initialUsers[0];
//                 var data = {
//                     email: user.email,
//                     password: 'incorrect_pass'
//                 };
//                 var expectedStatus = 401;
//                 var expectedBody = {
//                     reason: 'invalid un/pw',
//                     info: {
//                         status: 'invalid un/pw',
//                         userId: user._id.toString(),
//                         email: user.email
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 with jwt and user when apiKey is correct', function (done) {
//                 var user = initialUsers[0];
//                 var data = {
//                     apiKey: 'correct_apikey'
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     jwt: 'encoded_string',
//                     user: { 
//                         _id: user._id,
//                         displayName: user.email,
//                         verified: /^(\w|-|:|.){24}$/,
//                         roles: ['owner'],
//                         jwtExpiry: /^(\w|-|:|.){24}$/,
//                         currentSite: currentSite.toString()
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
            
//             it('should return status 200 with jwt and user when email/pass are valid', function (done) {
//                 var user = initialUsers[0];
//                 var data = {
//                     email: user.email,
//                     password: 'correct_pass'
//                 };
//                 var expectedStatus = 200;
//                 var expectedBody = {
//                     jwt: 'encoded_string',
//                     user: { 
//                         _id: user._id,
//                         displayName: user.email,
//                         verified: /^(\w|-|:|.){24}$/,
//                         roles: ['owner'],
//                         jwtExpiry: /^(\w|-|:|.){24}$/,
//                         currentSite: currentSite.toString()
//                     }
//                 };
                
//                 test(initialUsers, data, expectedStatus, expectedBody, done);
//             });
//         });
        
//         describe('requireRoles', function() {
//             var ensureAuthenticatedStub;
//             var httpUtilStub;
//             before(function() {
//                 ensureAuthenticatedStub = sinon.stub(auth, 'ensureAuthenticated', function(req, res, next) {
//                     next();
//                 });
//                 httpUtilStub = sinon.stub(httpUtil, 'processError');
//             });
            
//             afterEach(function() {
//                 ensureAuthenticatedStub.reset();
//                 httpUtilStub.reset();
//             });
            
//             after(function() {
//                 auth.ensureAuthenticated.restore();
//                 httpUtil.processError.restore();
//             });
            
//             function test(req, roles, expectedErr) {
//                 var res = {};
//                 var next = function() {
//                     should(expectedErr).be.not.ok;
//                 };
                
//                 auth.requireRoles(roles)(req, res, next);
                
//                 should(ensureAuthenticatedStub.calledOnce).be.true;
//                 if (expectedErr) {
//                     should(httpUtilStub.calledOnce).be.true;
//                     should(httpUtilStub.calledWithExactly(expectedErr, null, res, next)).be.true;
//                 } else {
//                     should(httpUtilStub.called).be.false;
//                 }
//             }
            
//             it('should return status 401 when roles is a string and user.roles isn\'t intersects with roles', function() {
//                 var req = {
//                     user: { roles: ['admin', 'user'] }
//                 };
//                 var roles = 'developer';
//                 var expectedErr = errorUtil.getAccessDeniedError();
                
//                 test(req, roles, expectedErr);
//             });
            
//             it('should return status 401 when roles is an array and user.roles isn\'t intersects with roles', function() {
//                 var req = {
//                     user: { roles: ['admin', 'user'] }
//                 };
//                 var roles = ['developer', 'writer'];
//                 var expectedErr = errorUtil.getAccessDeniedError();
                
//                 test(req, roles, expectedErr);
//             });
            
//             it('should call next when roles is a string and user.roles is intersects with roles', function() {
//                 var req = {
//                     user: { roles: ['admin', 'user'] }
//                 };
//                 var roles = 'admin';

//                 test(req, roles);
//             });
            
//             it('should call next when roles is an array and user.roles is intersects with roles', function() {
//                 var req = {
//                     user: { roles: ['admin', 'user'] }
//                 };
//                 var roles = ['admin', 'writer'];

//                 test(req, roles);
//             });
//         });
//     });
// });
