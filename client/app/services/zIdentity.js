angular.module('app').factory('zIdentity', function ($window) {
    var storage = $window.localStorage;
    var cachedJwt;
    var cachedCurrentUser;
    var userJwt = 'userJwt';
    var currentUser = 'currentUser';

    return {
        setJwt: function (jwt, user) {
            cachedJwt = jwt;
            storage.setItem(userJwt, jwt);
            cachedCurrentUser = user;
            storage.setItem(currentUser, JSON.stringify(user));
        },
        
        getJwt: function () {
            if (!cachedJwt) {
                cachedJwt = storage.getItem(userJwt);
            }
            return cachedJwt;
        },
        
        removeJwt: function () {
            cachedJwt = null;
            storage.removeItem(userJwt);
            cachedCurrentUser = null;
            storage.removeItem(currentUser);
        },

        isAuthenticated: function () {
            return !!this.getJwt();
        },

        getCurrentUser: function () {
            if (!cachedCurrentUser) {
                cachedCurrentUser = JSON.parse(storage.getItem(currentUser));
            }
            return cachedCurrentUser;
        },

        setCurrentUser: function (user) {
            //used to store new registration user for confirmation page
            cachedCurrentUser = user;
            storage.setItem(currentUser, JSON.stringify(user));
        },

        isAuthorized: function (roles) {
            var user = this.getCurrentUser();
            if (!user) {
                return false;
            }
            var hasRole = false;
            if (typeof roles === 'string') {
                roles = [roles];
            }
            roles.some(function (role) {
                if (user.roles.indexOf(role) > -1) {
                    hasRole = true;
                    return true;
                }
            });
            return hasRole;
        }
    };
});