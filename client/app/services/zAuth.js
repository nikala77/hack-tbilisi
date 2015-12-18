angular.module('app').factory('zAuth', function ($http, $q, zIdentity, zUser, jwtHelper, zUserEchoService, zTheme, zNotifier) {
    return {
        authenticateUser: function (email, password) {
            return $http
                .post('/login', {
                    email: email,
                    password: password
                })
                .then(function (response) {
                    zIdentity.setJwt(response.data.jwt, response.data.user);
                    return response.data;
                });
        },
        
        registerOwner: function (newUserData) {
            return $http
                .post('/api/users/register', newUserData)
                .then(function (response) {
                    return zIdentity.setCurrentUser(response.data);
                });
        },
        
        changeSite: function (siteId) {
            var self = this;
            return zUser
                .get({ id: zIdentity.getCurrentUser()._id })
                .$promise
                .then(function (user) {
                    user.currentSite = siteId;
                    return user.$update();
                })
                .then(function () {
                    return self.refreshJwt();
                });
        },

        logoutUser: function () {
            // remove userEcho feedback button
            $('.ue-tab-container').remove();
            // logout userEcho
            var accessToken;
            var SSO_GUI = zIdentity.getCurrentUser()._id;

            zUserEchoService.getAccessToken()
                .then(function(data) {
                    accessToken = data.accessToken;

                    return $http
                        .get('https://userecho.com/api/v2/users/sso/'+ SSO_GUI +'.json?access_token='+ accessToken);
                })
                .then(function(api) {
                    var id = api.data.data? api.data.data.id : '1';

                    zIdentity.removeJwt();

                    return $http
                        .get('https://userecho.com/api/v2/users/'+ id +'/logout.json?access_token='+ accessToken);
                })
                .catch(function(err) {
                    zNotifier.error('Error occured While logout : ' + err);
                });
        },
        
        authorizeCurrentUserForRoute: function (role) {
            if (zIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        
        loggedIn: function () {
            var expToken = zIdentity.getJwt();
            var isTokenExpired = false;

            // check if token expired
            if(expToken) {
                isTokenExpired = jwtHelper.isTokenExpired(expToken);
            }

            if (zIdentity.isAuthenticated() && !isTokenExpired) {
                return true;
            } else {
                zIdentity.removeJwt();
                return $q.reject('not authenticated');
            }
        },
        
        refreshJwt: function() {
            return $http
                .get('/refreshJwt')
                .then(function (responce) {
                    return zIdentity.setJwt(responce.data.jwt, responce.data.user);
                })
                .catch(function () {
                    zIdentity.removeJwt();
                });
        }
    };
});