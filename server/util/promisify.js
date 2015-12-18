var Promise = require('bluebird');

Promise.promisifyAll(require('needle'));
Promise.promisifyAll(require('fs'));
Promise.promisifyAll(require('gm'));
Promise.promisifyAll(require('formidable'));
Promise.promisifyAll(require('aws-sdk').STS);
Promise.promisifyAll(require('mongoose'));
// Promise.promisify(require('aws-sdk').S3, 'getSignedUrl'); //can't do it
