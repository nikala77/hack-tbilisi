var db = 'mongodb://localhost/zurili-test';

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
                        silent: true
                    }
                }
            }
        ]
    },
    
    // icalendar config
    icalendar: {
        active: false
    },

    // Token secret
    TOKEN_SECRET:'my sneaking token secret'
};
