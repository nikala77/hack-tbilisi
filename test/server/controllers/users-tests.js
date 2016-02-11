var request  = require('supertest');
var Promise  = require('bluebird');
var db       = require('mongoose');
var sinon    = require('sinon');
var should   = require('should');
var app      = require('../../../server/app');
var sync     = require('../../../server/util/sync');
var emails   = require('../../../server/util/emails');
var testUtil = require('../../testUtil/test-util');

describe('controllers', function() {
    describe('users', function () {
        var currentUser = {
            _id: testUtil.ObjectId(),
            roles: ['admin'],
            currentSite: testUtil.ObjectId()
        };
        
        before(function() {
            sinon.stub(sync, 'writeToQueues', function() {}); // required to prevent object.save actions
            sinon.stub(emails, 'sendNewUserEmail', function() {});
            sinon.stub(emails, 'sendEmailChangeEmail', function() {});
        });
        
        beforeEach(function() {
            testUtil.signIn(currentUser);
        });
        
        afterEach(function() {
            testUtil.signOut();
        });
        
        after(function() {
            sync.writeToQueues.restore();
            emails.sendNewUserEmail.restore();
            emails.sendEmailChangeEmail.restore();
        });
        
        describe('getUsers', function() {
            var initialSites = [
                {
                    _id: currentUser.currentSite,
                    name: 'site1'
                },
                {
                    _id: testUtil.ObjectId(),
                    name: 'site2'
                }
            ];
            var initialUsers = [
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[0]._id,
                    siteRoles: [{ site: initialSites[0], roles: ['admin',  'manager', 'owner'] }],
                    email: 'user1@mail.com',
                    firstName: 'f1',
                    lastName: 'l1'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[0]._id,
                    siteRoles: [{ site: initialSites[0], roles: ['admin'] }],
                    email: 'user2@mail.com',
                    firstName: 'f2',
                    lastName: 'l2'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[1]._id,
                    siteRoles: [{ site: initialSites[1], roles: ['owner'] }],
                    email: 'user3@mail.com',
                    firstName: 'f3',
                    lastName: 'l3'
                }
            ];
            var initialResources = [
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    name: 'resource1',
                    appointmentInterval: 11
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    name: 'resource2',
                    appointmentInterval: 12,
                    practitioner: initialUsers[0]
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    name: 'resource3',
                    appointmentInterval: 13
                }
            ];
            
            function test(query, expectedStatus, expectedBody, done) {
                testUtil
                    .save(db.model('site'), initialSites)
                    .then(function() {
                        return testUtil.save(db.model('user'), initialUsers);
                    })
                    .then(function() {
                        return testUtil.save(db.model('resource'), initialResources);
                    })
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            request(app)
                                .get('/api/users/')
                                .query(query)
                                .expect(expectedStatus)
                                .expect('Content-Type', /json/)
                                .expect(function(res) {
                                    testUtil.assert(res.body, expectedBody);
                                })
                                .end(function(err){
                                    if (err) { return reject(err); }
                                    resolve();
                                });
                        });
                    })
                    .then(function() {
                        done();
                    })
                    .catch(done);
            }
            
            it('should return status 401 when user isn\'t authenticated', function(done) {
                var expectedStatus = 401;
                var expectedBody = {
                    reason: 'Request must have Authorization header'
                };
                
                testUtil.signOut();
                test({}, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.query.in isn\'t array', function(done) {
                var query = {
                    in: 'invalid in'
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter in, val=' + query.in
                };
                
                test(query, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.query.in contains invalid ObjectId', function(done) {
                var query = {
                    in: [testUtil.ObjectId().toString(), 'invalid ref']
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter in, val=' + query.in.join(',')
                };
                
                test(query, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.query.roles isn\'t array', function(done) {
                var query = {
                    roles: 'invalid roles'
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter roles, val=' + query.roles
                };
                
                test(query, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.query.roles contains invalid role', function(done) {
                var query = {
                    roles: ['admin', 'invalid role']
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter roles, val=' + query.roles.join(',')
                };
                
                test(query, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and users.json when req.query is empty', function(done) {
                var expectedStatus = 200;
                var expectedBody = [
                    {
                        _id: initialUsers[0]._id,
                        firstName: 'f1',
                        lastName: 'l1',
                        email: 'user1@mail.com',
                        siteRoles: [{ roles: initialUsers[0].siteRoles[0].roles }]
                    },
                    {
                        _id: initialUsers[1]._id,
                        firstName: 'f2',
                        lastName: 'l2',
                        email: 'user2@mail.com',
                        siteRoles: [{ roles: initialUsers[1].siteRoles[0].roles }]
                    }
                ];
                
                test({}, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and users.json when req.query.in=Array', function(done) {
                var query = {
                    in: [initialUsers[0]._id.toString()]
                };
                var expectedStatus = 200;
                var expectedBody = [
                    {
                        _id: initialUsers[0]._id,
                        firstName: 'f1',
                        lastName: 'l1',
                        email: 'user1@mail.com',
                        siteRoles: [{ roles: initialUsers[0].siteRoles[0].roles }]
                    }
                ];
                
                test(query, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and users.json when req.query.roles=Array', function(done) {
                var query = {
                    roles: ['owner']
                };
                var expectedStatus = 200;
                var expectedBody = [
                    {
                        _id: initialUsers[0]._id,
                        firstName: 'f1',
                        lastName: 'l1',
                        email: 'user1@mail.com',
                        siteRoles: [{ roles: initialUsers[0].siteRoles[0].roles }]
                    }
                ];
                
                test(query, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and users.json when req.query.notLinkedToResources=true', function(done) {
                var query = {
                    notLinkedToResources: true
                };
                var expectedStatus = 200;
                var expectedBody = [
                    {
                        _id: initialUsers[1]._id,
                        firstName: 'f2',
                        lastName: 'l2',
                        email: 'user2@mail.com',
                        siteRoles: [{ roles: initialUsers[1].siteRoles[0].roles }]
                    }
                ];
                
                test(query, expectedStatus, expectedBody, done);
            });
        });
        
        describe('getUserById', function() {
            var initialSites = [
                {
                    _id: currentUser.currentSite,
                    name: 'site1'
                },
                {
                    _id: testUtil.ObjectId(),
                    name: 'site2'
                }
            ];
            var initialUsers = [
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[0]._id,
                    siteRoles: [{ site: initialSites[0], roles: ['admin'] }],
                    email: 'user1@mail.com'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[1]._id,
                    siteRoles: [{ site: initialSites[1], roles: ['admin'] }],
                    email: 'user2@mail.com'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[1]._id,
                    siteRoles: [{ site: initialSites[1], roles: ['admin'] }],
                    email: 'user3@mail.com'
                }
            ];
            
            function test(userId, expectedStatus, expectedBody, done) {
                testUtil
                    .save(db.model('site'), initialSites)
                    .then(function() {
                        return testUtil.save(db.model('user'), initialUsers);
                    })
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            request(app)
                                .get('/api/users/' + userId)
                                .expect(expectedStatus)
                                .expect('Content-Type', /json/)
                                .expect(function(res) {
                                    testUtil.assert(res.body, expectedBody);
                                })
                                .end(function(err){
                                    if (err) { return reject(err); }
                                    resolve();
                                });
                        });
                    })
                    .then(function() {
                        done();
                    })
                    .catch(done);
            }
            
            it('should return status 401 when user isn\'t authenticated', function(done) {
                var user = initialUsers[0];
                var expectedStatus = 401;
                var expectedBody = {
                    reason: 'Request must have Authorization header'
                };
                
                testUtil.signOut();
                test(user._id, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.params._id is invalid', function(done) {
                var userId = 'Invalid Id';
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter _id, val=Invalid Id'
                };
                
                test(userId, expectedStatus, expectedBody, done);
            });
           
            it('should return status 404 when user is not found by req.params._id', function(done) {
                var userId = testUtil.ObjectId();
                var expectedStatus = 404;
                var expectedBody = {
                    reason: 'user not found'
                };
                
                test(userId, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and user.json when user is found by req.params._id', function(done) {
                var user = initialUsers[0];
                var expectedStatus = 200;
                var expectedBody = {
                    __v: '_mock_',
                    _id: user._id,
                    email: user.email,
                    currentSite: initialSites[0]._id.toString(),
                    roles: ['admin']
                };
                
                test(user._id, expectedStatus, expectedBody, done);
            });
        });
        
        describe('createUser', function() {
            var initialSites = [
                {
                    _id: currentUser.currentSite,
                    name: 'site1'
                },
                {
                    _id: testUtil.ObjectId(),
                    name: 'site2'
                }
            ];
            var initialUsers = [
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[0]._id,
                    siteRoles: [{ site: initialSites[0], roles: ['admin'] }],
                    email: 'user1@mail.com',
                    firstName: 'f1',
                    lastName: 'l1'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[0]._id,
                    siteRoles: [{ site: initialSites[0], roles: ['admin'] }],
                    email: 'user2@mail.com',
                    firstName: 'f2',
                    lastName: 'l2'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[1]._id,
                    siteRoles: [{ site: initialSites[1], roles: ['admin'] }],
                    email: 'user3@mail.com',
                    firstName: 'f3',
                    lastName: 'l3'
                }
            ];
            var initialResources = [
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    name: 'resource1',
                    appointmentInterval: 11
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    name: 'resource2',
                    appointmentInterval: 12,
                    practitioner: initialUsers[0]
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    name: 'resource3',
                    appointmentInterval: 13
                }
            ];
            
            function test(userData, expectedStatus, expectedBody, done) {
                testUtil
                    .save(db.model('site'), initialSites)
                    .then(function() {
                        return testUtil.save(db.model('user'), initialUsers);
                    })
                    .then(function() {
                        return testUtil.save(db.model('resource'), initialResources);
                    })
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            request(app)
                                .post('/api/users')
                                .send(userData)
                                .expect(expectedStatus)
                                .expect(function(res) {
                                    if (expectedStatus !== 200) {
                                        should(res.headers['content-type']).be.match(/json/);
                                    }
                                    testUtil.assert(res.body, expectedBody);
                                })
                                .end(function(err){
                                    if (err) { return reject(err); }
                                    resolve();
                                });
                        });
                    })
                    .then(function() {
                        done();
                    })
                    .catch(done);
            }
            
            it('should return status 401 when user isn\'t authenticated', function(done) {
                var userData = {
                    name: 'newUser1'
                };
                var expectedStatus = 401;
                var expectedBody = {
                    reason: 'Request must have Authorization header'
                };
                
                testUtil.signOut();
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body is empty', function(done) {
                var userData;
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter email, val=undefined'
                };
                
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.linkedResource isn\'t valid ObjectId', function(done) {
                var userData = {
                    email: 'user4@mail.com',
                    roles: ['admin'],
                    linkedResource: 'Invalid ObjectId'
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter linkedResource, val=Invalid ObjectId'
                };
                
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.roles is empty', function(done) {
                var userData = {
                    email: 'user4@mail.com'
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter roles, val=undefined'
                };
                
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.roles contains invalid role', function(done) {
                var userData = {
                    email: 'user4@mail.com',
                    roles: ['admin', 'invalidRole']
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter roles, val=' + userData.roles.join(',')
                };
                
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.email is not valid email', function(done) {
                var userData = {
                    email: 'invalidEmail',
                    roles: ['admin', 'service provider']
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter email, val=' + userData.email
                };
    
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 409 when req.body.email is not unique', function(done) {
                var userData = {
                    email: 'user1@mail.com',
                    roles: ['admin']
                };
                var expectedStatus = 409;
                var expectedBody = {
                    reason: 'Email is not unique'
                };
                
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and create a new user when req.body is valid', function(done) {
                var userData = {
                    email: 'user4@mail.com',
                    roles: ['admin']
                };
                var expectedStatus = 200;
                var expectedBody = {};
                
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and create a new user when req.body.roles contains \'service provider\'', function(done) {
                var userData = {
                    email: 'user4@mail.com',
                    roles: ['admin', 'service provider']
                };
                var expectedStatus = 200;
                var expectedBody = {};
                
                test(userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and create a new user when req.body.linkedResource=ObjectId', function(done) {
                var userData = {
                    email: 'user4@mail.com',
                    roles: ['admin'],
                    linkedResource: initialResources[0]._id
                };
                var expectedStatus = 200;
                var expectedBody = {};
                
                test(userData, expectedStatus, expectedBody, done);
            });
        });
        
        describe('updateUser', function() {
            var initialSites = [
                {
                    _id: currentUser.currentSite,
                    name: 'site1'
                },
                {
                    _id: testUtil.ObjectId(),
                    name: 'site2'
                }
            ];
            var initialUsers = [
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[0]._id,
                    siteRoles: [{ site: initialSites[0], roles: ['admin'] }],
                    email: 'user1@mail.com',
                    firstName: 'f1',
                    lastName: 'l1'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[0]._id,
                    siteRoles: [{ site: initialSites[0], roles: ['admin'] }],
                    email: 'user2@mail.com',
                    firstName: 'f2',
                    lastName: 'l2'
                },
                { 
                    _id: testUtil.ObjectId(),
                    currentSite: initialSites[1]._id,
                    siteRoles: [{ site: initialSites[1], roles: ['admin'] }],
                    email: 'user3@mail.com',
                    firstName: 'f3',
                    lastName: 'l3'
                }
            ];
            var initialResources = [
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    name: 'resource1',
                    appointmentInterval: 11
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    name: 'resource2',
                    appointmentInterval: 12,
                    practitioner: initialUsers[0]
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    name: 'resource3',
                    appointmentInterval: 13
                }
            ];
            
            function test(userId, userData, expectedStatus, expectedBody, done) {
                testUtil
                    .save(db.model('site'), initialSites)
                    .then(function() {
                        return testUtil.save(db.model('user'), initialUsers);
                    })
                    .then(function() {
                        return testUtil.save(db.model('resource'), initialResources);
                    })
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            request(app)
                                .put('/api/users/' + userId)
                                .send(userData)
                                .expect(expectedStatus)
                                .expect(function(res) {
                                    if (expectedStatus !== 200) {
                                        should(res.headers['content-type']).be.match(/json/);
                                    }
                                    testUtil.assert(res.body, expectedBody);
                                })
                                .end(function(err){
                                    if (err) { return reject(err); }
                                    resolve();
                                });
                        });
                    })
                    .then(function() {
                        done();
                    })
                    .catch(done);
            }
            
            it('should return status 401 when user isn\'t authenticated', function(done) {
               var userId = initialUsers[0]._id;
               var userData = {
                    name: 'newUser1'
                };
                var expectedStatus = 401;
                var expectedBody = {
                    reason: 'Request must have Authorization header'
                };
                
                testUtil.signOut();
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.params._id is invalid', function(done) {
                var userId = 'InvalidId';
                var userData = {
                    email: 'user1@mail.com',
                    roles: ['admin']
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter _id, val=InvalidId'
                };
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body is empty', function(done) {
                var userId = initialUsers[0]._id;
                var userData;
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter email, val=undefined'
                };
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.linkedResource isn\'t valid ObjectId', function(done) {
                var userId = initialUsers[0]._id;
                var userData = {
                    email: 'user4@mail.com',
                    roles: ['admin'],
                    linkedResource: 'Invalid ObjectId'
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter linkedResource, val=Invalid ObjectId'
                };
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.roles is empty', function(done) {
                var userId = initialUsers[0]._id;
                var userData = {
                    email: 'user4@mail.com'
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter roles, val=undefined'
                };
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.roles contains invalid role', function(done) {
                var userId = initialUsers[0]._id;
                var userData = {
                    email: 'user4@mail.com',
                    roles: ['admin', 'invalidRole']
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter roles, val=' + userData.roles.join(',')
                };
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.email is not valid email', function(done) {
                var userId = initialUsers[0]._id;
                var userData = {
                    email: 'invalidEmail',
                    roles: ['admin', 'service provider']
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter email, val=' + userData.email
                };
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 404 when user is not found by req.params._id', function(done) {
                var userId = testUtil.ObjectId();
                var userData = {
                    email: 'user1@mail.com',
                    roles: ['admin']
                };
                var expectedStatus = 404;
                var expectedBody = {
                    reason: 'user not found'
                };
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and update an user when req.body is valid', function(done) {
                var userId = initialUsers[0]._id;
                var userData = {
                    email: 'user1@mail.com',
                    firstName: 'user1',
                    lastName: 'user1-last',
                    roles: ['admin', 'manager']
                };
                var expectedStatus = 200;
                var expectedBody = {};
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and update an user when req.body.linkedResource=ObjectId', function(done) {
                var userId = initialUsers[0]._id;
                var userData = {
                    email: 'user4@mail.com',
                    firstName: 'user1',
                    lastName: 'user1-last',
                    roles: ['admin', 'owner'],
                    linkedResource: initialResources[0]._id
                };
                var expectedStatus = 200;
                var expectedBody = {};
                
                test(userId, userData, expectedStatus, expectedBody, done);
            });
        });
    });
});
