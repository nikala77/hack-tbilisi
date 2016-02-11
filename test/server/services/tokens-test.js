/*jshint expr: true */

/* jshint ignore:start */
var chai       = require('chai');
var tokensSrvc = require('../../../server/services/tokens');
var usersSrvc  = require('../../../server/services/users');

var expect = chai.expect;

describe.skip('services', function () {
    describe('Tokens service', function () {
        var _tokenId;
        var origEmail;
        var newUserEmail = 'new@nowhere.com';
        it('should create a new emailChange token', function (done) {
            origEmail = testUser.email;
            return tokensSrvc.createToken(testUser, 'emailChange', newUserEmail)
                .then(function (tokenId) {
                    _tokenId = tokenId;
                    expect(tokenId).to.not.be.null;
                    return done();
                })
                .catch(done);
        });

        it('should update user email hen process token', function (done) {
            return tokensSrvc.handleTokenId(_tokenId)
                .then(function (data) {
                    return usersSrvc.getUser({
                        _id: data.userId
                    })
                        .then(function (user) {
                            expect(user.email).to.equal(newUserEmail);
                            user.email = origEmail;
                            usersSrvc.saveUser(user)
                                .then(function () {
                                    done();
                                });
                        });
                })
                .catch(done);

        });

        it('should create a new pw reset token', function (done) {
            return tokensSrvc.createToken(testUser, 'passwordReset')
                .then(function (tokenId) {
                    _tokenId = tokenId;
                    expect(tokenId).to.not.be.null;
                    return done();
                })
                .catch(done);
        });

        it('should not verify an unhandled pw reset token', function () {
            return expect(tokensSrvc.verifyHasRecentPwResetToken(testUser)).to.be.rejected;
        });

        it('should verify a handled pw reset token', function (done) {
            return tokensSrvc.handleTokenId(_tokenId)
                .then(function () {
                    tokensSrvc.verifyHasRecentPwResetToken(testUser)
                        .then(function (user) {
                            expect(user).to.not.be.null;
                            done();
                        });
                })
                .catch(done);
        });
    });
});
/* jshint ignore:end */
