// var request		 = require('supertest');
// var Promise		 = require('bluebird');
// var app      	 = require('../../../server/app');
// var db      	 = require('mongoose');
// var testUtil 	 = require('../../testUtil/test-util');

// describe('controllers', function() {
// 	describe('userEcho', function() {
// 		describe('getToken', function() { 
// 			var initialUsers = [
// 				{ 
// 					_id: testUtil.ObjectId(),
// 					email: 'user1@mail.com',
// 					firstName: 'f1',
// 					lastName: 'l1'
// 				},
// 				{ 
// 					_id: testUtil.ObjectId(),
// 					email: 'user2@mail.com',
// 					firstName: 'f2',
// 					lastName: 'l2'
// 				},
// 				{ 
// 				_id: testUtil.ObjectId(),
// 					email: 'user3@mail.com',
// 					firstName: 'f3',
// 					lastName: 'l3'
// 				}
// 			];

// 			it('should return status 401 Unauthorized error', function(done) {
// 				var siteData = { 
// 					id: '7asa123jban', 
// 					username: 'Jon Doe',
// 					email: 'test@gmail.com', 
// 					avatar_url: '/images/ueAvatar.png' // jshint ignore:line
// 				};

// 				test(siteData, 401, {}, done);

// 			});
// 			var currentUser = {
// 	            _id: testUtil.ObjectId(),
// 	            roles: ['admin'],
// 	            currentSite: testUtil.ObjectId()
// 	        };
// 			beforeEach(function() {
// 				testUtil.signIn(currentUser);
// 			});
// 			function test(siteData, expectedStatus, expectedBody, done) {
// 				testUtil
//                     .save(db.model('user'), initialUsers)
// 					.then(function() {
// 						return new Promise(function(resolve, reject) {
// 							request(app)
// 								.get('/api/token/getUserEcho')
// 								.send(siteData)
// 								.expect(expectedStatus)
// 								.expect(function(res) {
// 									testUtil.assert(res.body, expectedBody);
// 								})
// 								.end(function(err) {
// 									if (err) { return reject(err); }
// 									resolve();
// 								});
// 						});
// 					})
// 					.then(function() {
// 						done();
// 					})
// 					.catch(done);
// 			}
// 		});
// 	});
// });