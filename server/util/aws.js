var AWS          = require('aws-sdk');
var fs           = require('fs');
var Promise      = require('bluebird');
var awsConfig    = require('../../config/environment').aws;
var encryption   = require('../util/encryption');

AWS.config.update(awsConfig);

// TODO: test it
exports.getTemporaryCredentials = function(currentSiteId) {
    var policy = {
        'Version': '2012-10-17',
        'Statement': [{
            'Effect': 'Allow',
            'Action': ['s3:ListBucket'],
            'Resource': ['arn:aws:s3:::' + awsConfig.bucket],
            'Condition': {
                'StringEquals': {
                    's3:prefix': currentSiteId
                }
            }
        }, {
            'Effect': 'Allow',
            'Action': [
                's3:GetObject',
                's3:PutObject'
            ],
            'Resource': ['arn:aws:s3:::' + awsConfig.bucket + '/' + currentSiteId + '/*']
        }]
    };
    var params = {
        Name: currentSiteId,
        DurationSeconds: 43200, //12 houra
        Policy: JSON.stringify(policy, null, '\t')
    };

    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/STS.html#getFederationToken-property
    var sts = new AWS.STS({
        region: awsConfig.region
    });
    return new Promise(function(resolve, reject) {
        sts.getFederationToken(params, function(err, data) {
            if (err) {
                return reject(err);
            }
            data.Credentials.Bucket = awsConfig.bucket;
            data.Credentials.Region = awsConfig.region;
            resolve(data.Credentials);
        });
    });
};

// TODO: test it
exports.getTemporaryCredentialsSync = function(siteId, userId) {
    //http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/UsingIAM.html#UsingWithSQS_Actions
    var policy = {
        'Version': '2012-10-17',
        'Statement': [{
            'Effect': 'Allow',
            'Action': ['s3:ListBucket'],
            'Resource': ['arn:aws:s3:::' + awsConfig.bucket],
            'Condition': {
                'StringEquals': {
                    's3:prefix': siteId
                }
            }
        }, {
            'Effect': 'Allow',
            'Action': [
                's3:GetObject',
                's3:PutObject'
            ],
            'Resource': ['arn:aws:s3:::' + awsConfig.bucket + '/' + siteId + '/*']
        }, {
            'Sid': userId + 'QueueAll',
            'Effect': 'Allow',
            'Action': 'sqs:*',
            // 'Resource': 'arn:aws:sqs:' + awsConfig.region + ':' + awsConfig.accountId + ':*'
            'Resource': 'arn:aws:sqs:' + awsConfig.region + ':' + awsConfig.accountId + ':' + 'sync_' + userId + '_*'
        }]
    };
    var params = {
        Name: encryption.createHash(siteId + userId).toString(),
        DurationSeconds: 43200, //12 hours
        Policy: JSON.stringify(policy, null, '\t')
    };

    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/STS.html#getFederationToken-property
    var sts = new AWS.STS({
        region: awsConfig.region
    });
    return new Promise(function(resolve, reject) {
        sts.getFederationToken(params, function(err, data) {
            if (err) {
                return reject(err);
            }
            data.Credentials.Bucket = awsConfig.bucket;
            data.Credentials.Region = awsConfig.region;
            resolve(data.Credentials);
        });
    });
};

// var queueUrl;
var MessageRetentionPeriodDays = 7;
var VisibilityTimeoutMin = 5;
var ReceiveMessageWaitTimeSeconds = 5;
var queues = {};

// TODO: test it
exports.createQueue = function(queueName) {
    return new Promise(function(resolve, reject) {
        if (queues[queueName] !== undefined) {
            return resolve(queues[queueName]);
        }

        var sqs = new AWS.SQS({
            apiVersion: '2012-11-05'
        });
        var params = {
            QueueName: queueName,
            Attributes: {
                MessageRetentionPeriod: (MessageRetentionPeriodDays * 24 * 60 * 60).toString(),
                ReceiveMessageWaitTimeSeconds: ReceiveMessageWaitTimeSeconds.toString(),
                VisibilityTimeout: (VisibilityTimeoutMin * 60).toString()
            }
        };
        sqs.createQueue(params, function(err, data) {
            if (err) {
                return reject(err);
            }
            queues[queueName] = data.QueueUrl;
            return resolve(data.QueueUrl);
        });
    });
};

// TODO: test it
exports.addQueueMessage = function(queueUrl, messageBody) {
    return new Promise(function(resolve, reject) {
        var sqs = new AWS.SQS({
            apiVersion: '2012-11-05'
        });
        var params = {
            MessageBody: messageBody,
            QueueUrl: queueUrl
        };
        sqs.sendMessage(params, function(err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
};

// TODO: test it
exports.retrieveQueueMessages = function(queueUrl) {
    return new Promise(function(resolve, reject) {
        var sqs = new AWS.SQS({
            apiVersion: '2012-11-05'
        });
        var params = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 10,
        };
        sqs.receiveMessage(params, function(err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data.Messages);
        });
    });
};

// TODO: test it
exports.deleteQueueEntries = function(queueUrl, messages) {
    return new Promise(function(resolve, reject) {
        var sqs = new AWS.SQS({
            apiVersion: '2012-11-05'
        });
        var entries = messages.map(function(message) {
            return {
                Id: encryption.createHash(message.ReceiptHandle).toString(),
                ReceiptHandle: message.ReceiptHandle
            };
        });
        var params = {
            QueueUrl: queueUrl,
            Entries: entries
        };
        sqs.deleteMessageBatch(params, function(err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
};

// TODO: test it
exports.getSignedUrl = function(currentSiteId, type, key) {
    //type is 'putObject' or 'getObject'
    var s3 = new AWS.S3({
        computeChecksums: true
    }); // this is the default setting
    var params = {
        Bucket: awsConfig.bucket,
        Key: currentSiteId + '/' + key
    };
    
    return new Promise(function(resolve, reject) {
        s3.getSignedUrl(type, params, function(err, url) {
            if (err) {
                return reject(err);
            }
            return resolve(url);
        });
    });
};

// TODO: test it
exports.putFileToS3 = function(srcFilepath, dstKey, filetype) {
    return fs
        .readFileAsync(srcFilepath)
        .then(function(fileBuffer) {
            var s3params = {
                Bucket: awsConfig.bucket,
                Key: dstKey,
                Body: fileBuffer,
                ContentType: filetype
            };
            return s3putObject(s3params);
        });
};

// TODO: test it
exports.copyToS3 = function(srcKey, dstKey, filetype) {
    var s3params = {
        Bucket: awsConfig.bucket,
        Key: dstKey,
        CopySource: awsConfig.bucket + '/' + srcKey,
        ContentType: filetype || 'image/jpeg'
    };
    return new Promise(function(resolve, reject) {
        var s3 = new AWS.S3();
        s3.copyObject(s3params, function(err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};

// TODO: test it
var s3putObject = exports.s3putObject = function(s3params) {
    return new Promise(function(resolve, reject) {
        var s3 = new AWS.S3();
        s3.putObject(s3params, function(err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};
