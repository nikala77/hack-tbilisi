angular.module('app').factory('zAws', function($http, $q) {
    var gettingCredsPromise;

    return {
        config: AWS.config,
        aws: function() {
            if (gettingCredsPromise) {
                return gettingCredsPromise;
            }
            
            var deferred = $q.defer();
            if (AWS.config.credentials && !AWS.config.credentials.expired) {
                deferred.resolve(AWS);
            } else {
                $http
                    .get('/api/token/getTemporaryCredentials')
                    .then(function (res) {
                        AWS.config.credentials = new AWS.Credentials(res.data.AccessKeyId, res.data.SecretAccessKey, res.data.SessionToken);
                        AWS.config.credentials.expireTime = res.data.Expiration;
                        AWS.config.region = res.data.Region;
                        AWS.config.s3 = { bucket: res.data.Bucket };
                        deferred.resolve(AWS);
                    })
                    .catch(function(err) {
                        deferred.reject(err.data.reason);
                    })
                    .finally(function() {
                        gettingCredsPromise = null;
                    });
            }
            
            gettingCredsPromise = deferred.promise;
            return gettingCredsPromise;
        }
    };
});