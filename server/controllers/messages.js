var clientsSrvc = require('../services/clients');
var sms         = require('../util/sms');
var ical        = require('../util/ical');
var httpUtil    = require('../util/httpUtil');

// TODO: test it
exports.sendSmsToClient = function (req, res, next) {
    req.params.site = req.user.currentSite;
    
    return clientsSrvc
        .getClient(req.params).bind({ message: req.body.messsage })
        // TODO .then(sendSms)
        .then(function () {
            return res.status(200).end();
        })
        .catch(function (err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};

// TODO: test it
exports.smsIcalToClient = function (req, res, next) {
    req.params.site = req.user.currentSite;
    
    return clientsSrvc
        .getClient(req.params)
        .then(function (client) {
            var icalUrl = ical.getIcalUrl('client', client._id);
            var message = 'Click to load calendar: ' + icalUrl;
            return sms.sendSms(client.mobile, message);
        })
        .then(function () {
            return res.status(200).end();
        })
        .catch(function (err) {
            return httpUtil.processError(err, 'json', res, next);
        });
};
