/// <reference path="../../typings/node/node.d.ts"/>
var db = 'mongodb://localhost/zurili';

module.exports = {
    // Port
    port: process.env.PORT || 3000,

    // Host
    host: 'http://localhost:3000',

    // Database connection string
    db: db,

    // MailGun config
    mailgun: {
        apiKey: "key-c0b134465506fde0557db736c68d6300",
        domain: "zurili.com"
    },

    // AWS config
    aws: {
        accessKeyId: "AKIAIJX77LUZOPWXOO7A",
        secretAccessKey: "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",
        region: "ap-southeast-2",
        bucket: "data-au-dev",
        accountId: "557209845249"
    },

    // SMS config
    sms: {
        server: "http://api.traitel.com/smsgateway.pl",
        user: 'DrRichard',
        pass: 'vitality'
    },

    // Raygun config
    raygun: {
        apiKey: 'oiIY1Dn+9RrZk8tOk3Jahw=='
    },

    // Winston logger config
    winston: {
        loggers: [
            {
                name: 'common',
                transports: {
                    'console': {
                        colorize: true,
                        stringify: true,
                        prettyPrint: true
                    }
                }
            }
        ]
    },
    
    // icalendar config
    icalendar: {
        active: false
    },

    userEcho: {
        loginKey: '43453d2fd4b50ff1d4f8b73193d3b06f',
        logoutKey: 'f5128fc1539450c98d4ff639c39e701f7739b317'
    },

    // Token secret
    TOKEN_SECRET:'my sneaking token secret'
};
