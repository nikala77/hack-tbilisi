var request  = require('supertest');
var Promise  = require('bluebird');
var db       = require('mongoose');
var sinon    = require('sinon');
var app      = require('../../../server/app');
var sync     = require('../../../server/util/sync');
var testUtil = require('../../testUtil/test-util');

describe('controllers', function() {
    describe('clients', function() {
        var currentUser = {
            _id: testUtil.ObjectId(),
            roles: ['admin'],
            currentSite: testUtil.ObjectId()
        };
        
        before(function() {
            sinon.stub(sync, 'writeToQueues', function() {}); // required to prevent client.save actions
        });
        
        beforeEach(function() {
            testUtil.signIn(currentUser);
        });
        
        afterEach(function() {
            testUtil.signOut();
        });
        
        after(function() {
            sync.writeToQueues.restore();
        });
        
        describe('getClientById', function() {
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
            var initialClients = [
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    firstName: 'client1'
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    firstName: 'client2'
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    firstName: 'client3'
                }
            ];
            
            function test(clientId, expectedStatus, expectedBody, done) {
                testUtil
                    .save(db.model('site'), initialSites)
                    .then(function() {
                        return testUtil.save(db.model('client'), initialClients);
                    })
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            request(app)
                                .get('/api/clients/' + clientId)
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
                var client = initialClients[0];
                var expectedStatus = 401;
                var expectedBody = {
                    reason: 'Request must have Authorization header'
                };
                
                testUtil.signOut();
                test(client._id, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.params._id is invalid', function(done) {
                var clientId = 'Invalid Id';
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter _id, val=Invalid Id'
                };
                
                test(clientId, expectedStatus, expectedBody, done);
            });
           
            it('should return status 404 when client is not found by req.params._id', function(done) {
                var clientId = testUtil.ObjectId();
                var expectedStatus = 404;
                var expectedBody = {
                    reason: 'client not found'
                };
                
                test(clientId, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and client.json when client is found by req.params._id', function(done) {
                var client = initialClients[0];
                var expectedStatus = 200;
                var expectedBody = {
                    _id: client._id,
                    firstName: client.firstName,
                    site: testUtil.currentUser.currentSite.toString(),
                    status: 'Active',
                    hash: '_mock_', 
                    stats: '_mock_',
                    created: '_mock_'
                };
                
                test(client._id, expectedStatus, expectedBody, done);
            });
        });
        
        describe('createClient', function() {
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
            var initialClients = [
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    firstName: 'client1'
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    firstName: 'client2'
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    firstName: 'client3'
                }
            ];
            
            function test(clientData, expectedStatus, expectedBody, done) {
                testUtil
                    .save(db.model('site'), initialSites)
                    .then(function() {
                        return testUtil.save(db.model('client'), initialClients);
                    })
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            request(app)
                                .post('/api/clients')
                                .send(clientData)
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
                var clientData = {
                    firstName: 'newUser1'
                };
                var expectedStatus = 401;
                var expectedBody = {
                    reason: 'Request must have Authorization header'
                };
                
                testUtil.signOut();
                test(clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body is empty', function(done) {
                var clientData;
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter firstName, val=undefined'
                };
                
                test(clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.firstName is empty or invalid', function(done) {
                var clientData = {};
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter firstName, val=undefined'
                };
                
                test(clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and create a new client when req.body is valid', function(done) {
                var clientData = {
                    firstName: 'newUser1'
                };
                var expectedStatus = 200;
                var expectedBody = {
                    __v: '_mock_',
                    _id: '_mock_',
                    created: '_mock_',
                    hash: '_mock_',
                    lastEditedBy: '_mock_',
                    site: testUtil.currentUser.currentSite.toString(),
                    stats: { appointments: { nextAppointments: { resourceNames: [] } } },
                    status: 'Active',
                    firstName: 'newUser1'
                };
                
                test(clientData, expectedStatus, expectedBody, done);
            });
        });
        
        describe('updateClient', function() {
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
            var initialClients = [
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[0],
                    firstName: 'client1'
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    firstName: 'client2'
                },
                { 
                    _id: testUtil.ObjectId(),
                    site: initialSites[1],
                    firstName: 'client3'
                }
            ];
            
            function test(clientId, clientData, expectedStatus, expectedBody, done) {
                testUtil
                    .save(db.model('site'), initialSites)
                    .then(function() {
                        return testUtil.save(db.model('client'), initialClients);
                    })
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            request(app)
                                .post('/api/clients/' + clientId)
                                .send(clientData)
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
                var clientId = initialClients[0]._id;
                var clientData = {
                    firstName: 'newUser1'
                };
                var expectedStatus = 401;
                var expectedBody = {
                    reason: 'Request must have Authorization header'
                };
                
                testUtil.signOut();
                test(clientId, clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.params._id is invalid', function(done) {
                var clientId = 'InvalidID';
                var clientData = {
                    firstName: 'updatedUser1'
                };
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter _id, val=undefined'
                };
                
                test(clientId, clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body is empty', function(done) {
                var clientId = initialClients[0]._id;
                var clientData;
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter firstName, val=undefined'
                };
                
                test(clientId, clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 422 when req.body.firstName is empty or invalid', function(done) {
                var clientId = initialClients[0]._id;
                var clientData = {};
                var expectedStatus = 422;
                var expectedBody = {
                    reason: 'Invalid parameter firstName, val=undefined'
                };
                
                test(clientId, clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 404 when client is not found by req.params._id', function(done) {
                var clientId = testUtil.ObjectId();
                var clientData = {
                    firstName: 'updatedUser1'
                };
                var expectedStatus = 404;
                var expectedBody = {
                    reason: 'client not found'
                };
                
                test(clientId, clientData, expectedStatus, expectedBody, done);
            });
            
            it('should return status 200 and update a client when req.body is valid', function(done) {
                var clientId = initialClients[0]._id;
                var clientData = {
                    firstName: 'updatedUser1'
                };
                var expectedStatus = 200;
                var expectedBody = {
                    _id: clientId,
                    created: '_mock_',
                    hash: '_mock_',
                    lastEditedBy: '_mock_',
                    site: testUtil.currentUser.currentSite.toString(),
                    stats: { appointments: { nextAppointments: { resourceNames: [] } } },
                    status: 'Active',
                    firstName: 'updatedUser1'
                };
                
                test(clientId, clientData, expectedStatus, expectedBody, done);
            });
        });
    });
});
