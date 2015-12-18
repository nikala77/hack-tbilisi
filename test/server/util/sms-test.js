/*jshint expr: true */

/* jshint ignore:start */
var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon          = require('sinon');
var Promise        = require('bluebird');
var needle         = require('needle');
var smsConfig      = require('../../../config/environment').sms;
var smsSrvc        = require('../../../server/util/sms');
require('../../../server/util/promisify');

var expect = chai.expect;
chai.use(chaiAsPromised);

describe.skip('util', function() {
    describe('SMS service', function () {
        before(function () {
            sinon.stub(needle, 'postAsync', function () {
                return Promise.resolve({
                    statusCode: 200
                });
            });
        });

        after(function () {
            needle.postAsync.restore();
        });

        it('config should work', function () {
            expect(smsConfig).to.have.property('server');
        });

        it('should reject invalid mobile number', function () {
            return expect(smsSrvc.sendSms('1234', 'test message')).to.be.rejected;
        });

        it('should send to valid mobile number', function () {
            return expect(smsSrvc.sendSms('12345678', 'test message')).to.be.fulfilled;
        });
    });
});
/* jshint ignore:end */
