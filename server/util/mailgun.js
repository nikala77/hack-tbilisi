var jade          = require('jade');
var Mailgun       = require('mailgun-js');
var mailgunConfig = require('../../config/environment').mailgun;

var mailgun = new Mailgun(mailgunConfig);

// TODO: test it
exports.sendTransEmail = function (data) {
    data.pretty = true;
    data.compileDebug = false;
    var mailgunData = {
        from: 'Zurili<support@zurili.com>',
        to: data.emailTo,
        subject: data.subject,
        html: jade.renderFile('server/emails/' + data.emailType + '-html.jade', data),
        text: jade.renderFile('server/emails/' + data.emailType + '-text.jade', data)
    };
    
    return mailgun.messages().send(mailgunData);
};
