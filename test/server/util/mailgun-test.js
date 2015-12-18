/*jshint expr: true */

/* jshint ignore:start */
var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect         = chai.expect;
var mailgun        = require('../../../server/util/mailgun');

chai.use(chaiAsPromised);

describe.skip('util', function() {
    describe('mailgun service', function () {
        it('sendTransEmail should be fulfilled', function () {
            this.timeout(5000);
            var user = {
                firstName: 'aaTest',
                lastName: 'aaUser',
                email: 'dummy@nowhere.com'
            };
            var data = {
                emailType: 'passwordReset',
                user: user,
                subject: 'test email',
                emailTo: user.email,
                tokenUrl: 'http://localhost:3000/verify/'
            };

            return expect(mailgun.sendTransEmail(data)).to.be.fulfilled;
        });
    });
});
/* jshint ignore:end */
