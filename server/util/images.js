var fs      = require('fs');
var gm      = require('gm');
var Promise = require('bluebird');
var aws     = require('./aws');

var imageSizeOptions = {
    profilePic: [{
        name: 'extralarge',
        size: 512
    }, {
        name: 'large',
        size: 256
    }, {
        name: 'medium',
        size: 128
    }, {
        name: 'small',
        size: 64
    }, {
        name: 'tiny',
        size: 32
    }]
};

// TODO: test it
exports.putImage = function (params, imageFile) {
    var promises = imageSizeOptions.profilePic.map(function(imageSize) {
        var tempFile;
        return resizeImage(imageFile, imageSize)
            .then(function (file) {
                tempFile = file;
                var dstKey = params.siteId + '/' + params.type + '/' + params._id + imageSize.name + '.jpg';
                return aws.putFileToS3(tempFile.path, dstKey, tempFile.type);
            })
            .then(function() {
                deleteFile(tempFile);
            });
    });
    return Promise.all(promises);

    function resizeImage(file, imageSize) {
        return new Promise(function (resolve, reject) {
            var newFile = {};
            newFile.path = createNewFilePath(file.path, imageSize.name);
            newFile.type = file.type;
            gm(file.path)
                .resize(imageSize.size)
                .noProfile()
                .write(newFile.path, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(newFile);
                });
        });
    }

    function createNewFilePath(filepath, insertion) {
        return filepath + insertion;
        //can't user path.parse in node 0.10.26. Must be 0.12
        //parse = path.parse(filePath);
        //return parse.dir + '/' + parse.name + insertion + parse.ext;
    }

    function deleteFile(file) {
        return new Promise(function (resolve, reject) {
            fs.unlink(file.path, function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }
};

// TODO: test it
exports.copyImage = function (params) {
    var promises = imageSizeOptions.profilePic.map(function(imageSize) {
        var scrKey = params.siteId + '/' + params.srcType + '/' + params.srcId + imageSize.name + '.jpg';
        var dstKey = params.siteId + '/' + params.dstType + '/' + params.dstId + imageSize.name + '.jpg';
        return aws.copyToS3(scrKey, dstKey);
    });
    return Promise.all(promises);
};
