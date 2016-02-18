// /*jshint expr: true */

// /* jshint ignore:start */
// var chai           = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// var aws            = require('../../../server/util/aws');
// require('../../../server/util/promisify');

// var expect = chai.expect;
// chai.use(chaiAsPromised);

// describe.skip('util', function() {
//     describe('SQS service', function() {
//         var queueUrl;
//         var testMessageBody = 'This is ground control to Major Tom';
//         var retrievedMessages;

//         it('should create a queue', function(done) {
//             this.timeout(10000);
//             return aws.createQueue('testQueue')
//                 .then(function(url) {
//                     queueUrl = url;
//                     return done();
//                 }, done);
//         });

//         it('should add queue entry', function() {
//             this.timeout(10000);
//             return expect(aws.addQueueMessage(queueUrl, testMessageBody))
//                 .to.be.fulfilled;
//         });

//         it('should retrieve queue entry', function(done) {
//             this.timeout(10000);
//             return aws.retrieveQueueMessages(queueUrl)
//                 .then(function(messages) {
//                     retrievedMessages = messages;
//                     return done();
//                 }, done);
//         });

//         it('should delete queue entry', function() {
//             this.timeout(10000);
//             return expect(aws.deleteQueueEntries(queueUrl, retrievedMessages))
//                 .to.be.fulfilled;
//         });

//         it('should generate temporary credentials', function(done) {
//             this.timeout(10000);
//             return aws.getTemporaryCredentialsSync('site1234', 'user1234')
//                 .then(function() {
//                     return done();
//                 }, done);
//         });

//     });

//     describe('S3 service', function() {
//         it('getSignedUrl should return a url', function() {
//             return expect(getSignedUrl()).to.eventually.be.not.null;

//             function getSignedUrl() {
//                 return aws.getSignedUrl('site1234', 'putObject', 'key1234');
//             }
//         });

//         it('putFileToS3 should send the file', function() {
//             this.timeout(15000);
//             var file = {};
//             file.path = __dirname + '\\..\\mocha.opts';
//             destName = 'testUploadFile';

//             return expect(aws.putFileToS3(file, destName)).to.be.fulfilled;
//         });

//         it('should get temporary creds', function() {
//             this.timeout(10000);
//             return expect(getTemporaryCreds()).to.eventually.have.property('AccessKeyId');

//             function getTemporaryCreds() {
//                 return aws.getTemporaryCredentials('site1234');
//             }
//         });
//     });
// });
// /* jshint ignore:end */
