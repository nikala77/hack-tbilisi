var mailgun = require('./mailgun');
var tokens  = require('../services/tokens');

// TODO: test it
exports.sendNewUserEmail = function (user, baseUrl) {
    return prepareAndSendTransEmail(user, user.email, 'Invitation from ' + user.currentSite.name, 'newUser', baseUrl);
};

// TODO: test it
exports.sendNewOwnerEmail = function (user, baseUrl) {
    return prepareAndSendTransEmail(user, user.email, 'New Owner Registration', 'newOwner', baseUrl);
};

// TODO: test it
exports.sendEmailChangeEmail = function (user, email, baseUrl) {
    return prepareAndSendTransEmail(user, email, 'Confirm email change', 'emailChange', baseUrl);
};

// TODO: test it
exports.sendEmailPwReset = function (user, baseUrl) {
    return prepareAndSendTransEmail(user, user.email, 'Password Reset', 'passwordReset', baseUrl);
};

function prepareAndSendTransEmail(user, to, subject, emailType, baseUrl) {
    return prepareTransEmail(user, to, subject, emailType, baseUrl)
        .then(mailgun.sendTransEmail);
}

function prepareTransEmail(user, to, subject, emailType, baseUrl) {
    var data = {
        emailType: emailType,
        user: user,
        subject: subject,
        emailTo: to,
        tokenUrl: baseUrl + '/verify/'
    };
    
    return tokens
        .createToken(user, data.emailType)
        .then(function (tokenId) {
            data.tokenUrl += tokenId;
            return data;
        });
}
