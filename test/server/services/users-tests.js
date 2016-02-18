// /*jshint expr: true */

// /* jshint ignore:start */
// var chai          = require('chai');
// var usersSrvc     = require('../../../server/services/users');
// var sitesSrvc     = require('../../../server/services/sites');
// var resourcesSrvc = require('../../../server/services/resources');
// var tokensSrvc    = require('../../../server/services/tokens');

// var expect = chai.expect;

// var newRegistrationData = {
//     displayName: 'aaTest',
//     siteName: 'aaSite',
//     email: 'dummy@nowhere.com',
//     password: 'whatever',
//     baseUrl: 'http://localhost:3000'
// };
// anotherUserData = {
//     firstName: 'aaAnother',
//     lastName: 'aaUser',
//     email: 'aaAnother@nowhere.com',
//     roles: ['admin', 'clinical'],
//     dob: '2000-01-01',
//     baseUrl: 'http://whatever.com'
// };
// var newRegistrationData2 = {
//     displayName: 'aaTest2',
//     siteName: 'aaSite2',
//     email: 'dummy2@nowhere.com',
//     password: 'whatever2',
//     baseUrl: 'http://localhost:3000'
// };

// var testUser, testSite, regUser2;

// describe.skip('services', function () {
//     describe('Register owner', function () {
//         it('should be a new user', function (done) {
//             usersSrvc.getUser({
//                 email: newRegistrationData.email
//             })
//                 .then(function (user) {
//                         testUser = user;
//                         expect(user).is.not.null;
//                         return done();
//                     },
//                     done);
//         });
    
//         it('should have an apiKey',function(){
//             expect(testUser).to.have.property('apiKey');
//         });

//         it('should be a linked site', function (done) {
//             sitesSrvc.getSite({
//                 _id: testUser.siteRoles[0].site
//             }).then(function (site) {
//                 testSite = site;
//                 expect(site).is.not.null;
//                 return done();
//             }, done);
//         });

//         it('should be linked to from the site', function () {
//             // expect(testUser.sites.indexOf(testSite._id)).to.not.equal(-1);
//             expect(testUser.siteRoles[0].site.toString()).to.equal(testSite._id.toString());
//         });

//         it('should have current roles', function () {
//             expect(testUser.roles).to.have.length(4);
//         });

//         it('user\'s siteroles should have all roles', function () {
//             var siteRolePresent = false;
//             testUser.siteRoles.forEach(function (siteRole) {
//                 if (siteRole.site.toString() === testSite.id) {
//                     siteRolePresent = true;
//                     expect(siteRole.roles).to.have.length(4);
//                 }
//             });
//             expect(siteRolePresent).to.be.true;
//         });

//         // it('site should reference user', function () {
//         //     var testSiteUserIds = testSite.users.map(function (user) {
//         //         return user._id;
//         //     });
//         //     expect(testSiteUserIds).to.contain(testUser._id);
//         // });

//         it('should have a resource', function (done) {
//             return resourcesSrvc.getResource({
//                 practitioner: testUser._id
//             })
//                 .then(function (resource) {
//                     expect(resource).is.not.null;
//                     expect(resource).has.property('name').with.length.above(2);
//                     return done();
//                 })
//                 .catch(done);
//         });

//         //It would really be a add-new-site
//         it('should reject re-registering same owner', function () {
//             return expect(usersSrvc.registerOwner(newRegistrationData)).to.be.rejected;
//         });

//     });

//     describe('Add another user', function () {
//         it('should add a new user to same site', function () {
//             anotherUserData.currentSite = testSite._id;
//             return expect(usersSrvc.createUser(anotherUserData)).to.be.fulfilled;
//         });

//         it('should only have the roles given', function () {
//             return usersSrvc.getUser({
//                 email: anotherUserData.email
//             })
//                 .then(function (user) {
//                     return expect(user.roles.length).to.equal(anotherUserData.roles.length);
//                 });
//         });

//         it('should not allow add existing user to same site', function () {
//             return expect(usersSrvc.createUser(anotherUserData)).to.be.rejected;
//         });

//         it('should add existing user to a different site', function (done) {
//             return usersSrvc.registerOwner(newRegistrationData2)
//                 .then(function (user) {
//                     regUser2 = user;
//                     return sitesSrvc.getSite({
//                         _id: user.currentSite.toString()
//                     })
//                         .then(function (site) {
//                             anotherUserData.currentSite = site;
//                             return usersSrvc.createUser(anotherUserData)
//                                 .then(function (user) {
//                                     expect(user).to.not.be.null;
//                                     return done();
//                                 })
//                                 .catch(function (err) {
//                                     return done(err);
//                                 });
//                         });
//                 });
//         });

//         it('should allow existing non-owner user to register their own site', function (done) {
//             var newRegistrationData3 = {
//                 displayName: 'aaTest3',
//                 siteName: 'aaSite3',
//                 email: anotherUserData.email,
//                 password: 'whatever2',
//                 baseUrl: 'http://localhost:3000'
//             };
//             //        return expect(usersSrvc.registerOwner(newRegistrationData3)).to.be.fulfilled;
//             return usersSrvc.registerOwner(newRegistrationData3)
//                 .then(function (user) {
//                     expect(user).is.not.null;
//                     done();
//                 })
//                 .catch(function (err) {
//                     console.log('teest err: ' + err.toString());
//                     done(err);
//                 });
//         });

//         it('should get new resource if clincical', function () {
//             return usersSrvc.getUser({
//                 email: anotherUserData.email
//             })
//                 .then(function (user) {
//                     return expect(user.resource).to.not.be.null;
//                 });
//         });

//         it('should not get new resource if not clinical', function () {
//             anotherUserData2 = {
//                 firstName: 'aaAnother2',
//                 lastName: 'aaUser2',
//                 email: 'aaAnother2@nowhere.com',
//                 roles: ['admin'],
//                 baseUrl: 'http://whatever.com',
//                 dob: '2000-01-01',
//                 currentSite: testSite
//             };
//             return usersSrvc.createUser(anotherUserData2)
//                 .then(function (user) {
//                     expect(user.resource).to.be.undefined;
//                 });
//         });

//     });

//     describe('Get user', function () {
//         it('list should have 4 fields in list', function () {
//             return expect(userPropertyCount()).to.eventually.equal(4);

//             function userPropertyCount() {
//                 return usersSrvc.listUsers({
//                     'siteRoles.site': testUser.currentSite
//                 })
//                     .then(function (users) {
//                         var length = Object.getOwnPropertyNames(users[0]._doc).length;
//                         return length;
//                     });
//             }
//         });

//         it('details should not have private fields', function () {
//             var privateFields = ['password', 'salt', 'hashed_pwd'];
//             return expect(userContainsPrivateFields()).to.eventually.be.false;

//             function userContainsPrivateFields() {
//                 return usersSrvc.getUser({
//                     email: testUser.email
//                 })
//                     .then(function (user) {
//                         var containsDisallowedField = false;
//                         var fields = Object.getOwnPropertyNames(user);
//                         privateFields.forEach(function (disallowedField) {
//                             if (fields.indexOf(disallowedField) > -1) {
//                                 containsDisallowedField = true;
//                             }
//                         });
//                         return containsDisallowedField;
//                     });
//             }
//         });

//     });

//     describe('Delete user', function () {
//         it('should not delete an verified user', function () {
//             return expect(deleteAuthenticatedUser()).to.be.rejected;

//             function deleteAuthenticatedUser() {
//                 return usersSrvc.getUser({
//                     _id: testUser._id
//                 })
//                     .then(function (user) {
//                         user.verified = true;
//                         return usersSrvc.saveUser(user)
//                             .then(usersSrvc.deleteUser);
//                     });
//             }
//         });

//         //skip for now - no transactions associated with user
//         //    it('should not delete user with any transactions', function () {
//         //        expect(false).to.be.true;
//         //    });

//     });

//     describe('Set password', function () {
//         var tokenUser;
//         it('should set if no password', function () {
//             return expect(createUserAndSetPw()).to.be.fulfilled;

//             function createUserAndSetPw() {
//                 userData = {
//                     firstName: 'aaToken',
//                     lastName: 'aaTest',
//                     email: 'aaTokenTest@nowhere.com',
//                     roles: ['admin'],
//                     baseUrl: 'http://whatever.com',
//                     dob: '2000-01-01',
//                     currentSite: testSite
//                 };
//                 return usersSrvc.createUser(userData)
//                     .then(function (user) {
//                         tokenUser = user;
//                         return usersSrvc.SavePwIfRecentTokenOrNoPw(user._id, 'password');
//                     });
//             }
//         });

//         it('should reject if pw exists and no pw reset token', function () {
//             return expect(usersSrvc.SavePwIfRecentTokenOrNoPw(tokenUser._id, 'password')).to.be.rejected;
//         });

//         it('should permit if recent pw reset token', function () {
//             return expect(createTokenAndChangePw()).to.be.fulfilled;

//             function createTokenAndChangePw() {
//                 return tokensSrvc.createToken(tokenUser, 'passwordReset')
//                     .then(tokensSrvc.handleTokenId)
//                     .then(function () {
//                         return usersSrvc.SavePwIfRecentTokenOrNoPw(tokenUser._id, 'newPassword');
//                     });
//             }
//         });
//     });
// });
// /* jshint ignore:end */
