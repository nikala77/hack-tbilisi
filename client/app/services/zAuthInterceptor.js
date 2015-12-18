angular.module('app').factory('zAuthInterceptor', function (zIdentity) {
    return {
        request: function (config) {
            var jwt = zIdentity.getJwt();
            if (jwt) {
                config.headers.authorization = 'Bearer ' + jwt;
            }
            return config;
        },
        response: function (response) {
            return response;
        }
    };
});