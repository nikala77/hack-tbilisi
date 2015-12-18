/*jshint expr: true */

/* jshint ignore:start */
var chai        = require('chai');
var clientsSrvc = require('../../../server/services/clients');

var expect = chai.expect;

describe.skip('services', function () {
    describe('Create Client', function() {
        it('should have 6 fields in list', function() {
            return expect(propertyCount()).to.eventually.equal(6);

            function propertyCount() {
                return clientsSrvc.listClients({
                        site: testSite
                    })
                    .then(function(clients) {
                        var length = Object.getOwnPropertyNames(clients[0]._doc).length;
                        return length;
                    });
            }
        });

        it('should not be deleted if has appointments', function() {
            return expect(clientsSrvc.deleteClient(testClient)).to.be.rejected;
        });

        it('should have a sync hash', function() {
            expect(testClient).to.have.property('hash');
        });

    });

    describe('Client getHashedDocument', function() {
        it('should export a hashed document', function(done) {
            clientsSrvc.getHashedClient({
                    _id: testClient._id
                })
                .then(function(hashedClient) {
                    //console.log('hashedClient: ' + JSON.stringify(hashedClient));
                    expect(hashedClient).to.have.property('firstName');
                    return done();
                })
                .catch(function(err) {
                    return done(err);
                });
        });

        it('should export a hash list', function(done) {
            clientsSrvc.getHashList({
                    site: testAppointment.site
                })
                .then(function(hashList) {
                    //console.log('hashList: ' + JSON.stringify(hashList));
                    expect(hashList).to.not.be.empty;
                    return done();
                })
                .catch(function(err) {
                    return done(err);
                });
        });

        it('should modify a client', function(done) {
            return clientsSrvc.getClient({
                    _id: testClient._id
                })
                .then(function(client) {
                    client.firstName = 'modifiedFirstName';
                    client.lastEditedBy = {};
                    client.lastEditedBy.currentSite = testSite._id;
                    return clientsSrvc.saveClient(client)
                        .then(function() {
                            return done();
                        }, done);
                });
        });
    });
});
/* jshint ignore:end */
