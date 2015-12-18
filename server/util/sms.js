var needle    = require('needle');
var smsConfig = require('../../config/environment').sms;

//todo handle errors from account out of credit etc.
//probably change to Twilio for that...

// TODO: test it
exports.sendSmsToClient = function (client) {
    //move this one to clients.js - keep it clean!
    //todo save sms in client record
    
    // TODO: cleanMobile is not defined
    // var mobile = cleanMobile(client.mobile);
    sendSms(client.mobile);
};

exports.sendSms = sendSms;

function sendSms(mobile, message, countryCode) {
    countryCode = countryCode || 61;
    return validateMobile(mobile)
        .then(configParams)
        .then(postSms);

    function validateMobile(mobile) {
        return new Promise(function (resolve, reject) {
            // digits and leading '+' only
            // strip leading 0
            // add country code if no leading plus
            // strip the plus
            // http://stackoverflow.com/questions/123559/a-comprehensive-regex-for-phone-number-validation
            // http://stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
            mobile = mobile.replace('[^\d+]', '');
            if (mobile.length < 5) {
                return reject(new Error('Invalid mobile number'));
            }
            if (mobile.indexOf('0') === 0) {
                mobile = mobile.substring(1);
            }
            if (mobile.indexOf('+') !== 0) {
                mobile = '+' + countryCode + mobile;
            }
            mobile = mobile.replace(/\D/g, '');
            resolve(mobile);
        });
    }

    function configParams(mobile) {
        return new Promise(function (resolve) {
            var params = {
                to: mobile,
                user: smsConfig.user,
                pass: smsConfig.pass,
                concatenate: 'true',
                message: message
            };
            resolve(params);
        });
    }

    function postSms(params) {
        return needle
            .postAsync(smsConfig.server, params)
            .then(function (res) {
                if (res.statusCode !== 200) {
                    throw new Error('Unable to send sms: ' + res.statusCode);
                }
                return res;
            });
    }
}
