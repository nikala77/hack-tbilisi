// /*jshint expr: true */

// /* jshint ignore:start */
// var chai           = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// var expect         = chai.expect;
// var sinon          = require('sinon');
// var Promise        = require('bluebird');
// var aws            = require('../../../server/util/aws');
// var images         = require('../../../server/util/images');

// chai.use(chaiAsPromised);

// describe.skip('util', function() {
//     describe('Image service', function () {
//         before(function () {
//             sinon.stub(aws, 'putFileToS3', function () {
//                 return Promise.resolve();
//             });
//         });

//         after(function () {
//             aws.putFileToS3.restore();
//         });

//         it('putImage should fulfill', function () {
//             this.timeout(5000);
//             params = {
//                 type: 'client',
//                 _id: '123456',
//                 siteId: '789123',
//                 imageSizes: images.imageSizeOptions.profilePic
//             };
//             imageFile = {
//                 path: './test/integration/goats.jpg',
//                 type: 'image/jpeg'
//             };
//             return expect(images.putImage(params, imageFile))
//                 .to.be.fulfilled;
//         });
//     });
// });
// /* jshint ignore:end */
