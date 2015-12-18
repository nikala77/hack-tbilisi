angular.module('app').factory('zProfileImgGet', function (zAws, zIdentity, $cacheFactory) {

    var cache = $cacheFactory('zProfileImgGet', {
        number: 200
    });

    function getPic(item, options, done) {
        if (!item || !item._id) {
            return done(new Error('No _id'));
        }
        if (item.pic !== 's3') {
            return done(new Error('No s3'));
        }

        options.type = options.type || 'client';
        options.size = options.size || 'large';

        var key = zIdentity.getCurrentUser().currentSite + '/' + options.type + 's/pics/' + item._id + options.size + '.jpg';
        var value = cache.get(key);
        if (options.noCache || _.isUndefined(value)) {
            zAws.aws()
                .then(function (aws) {
                    var params = {};
                    params.Key = key;
                    if (options.noCache) {
                        params.ResponseCacheControl = 'max-age=1'; //force reload from s3
                    }
                    var bucket = new aws.S3({
                        params: {
                            Bucket: zAws.config.s3.bucket
                        }
                    });
                    bucket.getObject(params, function (err, s3object) {
                        if (err) {
                            return done(err);
                        }
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            cache.put(params.Key, reader.result);
                            return done(null, reader.result);
                        };
                        var blob = new Blob([s3object.Body], {
                            type: s3object.ContentType
                        });
                        reader.readAsDataURL(blob);
                    });
                })
                .catch(function(err) {
                    done(new Error('Can\'t get file credentials: ' + err));
                });
        } else {
            return done(null, value);
        }
    }
    
    function getPicElement(item, options, done) {
        var clazz = options.cssClass;
        getPic(item, options, function (err, dataURI) {
            if (err || !dataURI) {
                return done('<img src="/images/man64.png" class="' + clazz + '" />');
            }
            if (dataURI) {
                return done('<img src="' + dataURI + '" class="' + clazz + '" />');
            }
        });
    }
    
    return {
        getPic: getPic,
        getPicElement: getPicElement
    };
});