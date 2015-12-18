angular.module('app').factory('zUser', function($resource) {
    var userResource = $resource('/api/users/:id/:action',
        {
            id: '@_id'
        }, 
        {
            'update': {
                method: 'PUT',
                isArray: false
            }
        }
    );
    
    Object.defineProperty(userResource.prototype, 'name', {
        get: function() {
            return userResource.getName(this);
        }
    });

    Object.defineProperty(userResource.prototype, 'isAdmin', {
        get: function() {
            return this.roles && this.roles.indexOf('admin') !== -1 ;
        }
    });
    
    userResource.getName = function(user) {
        return (user.displayName || (user.firstName || '') + ' ' + (user.lastName || '')).trim();
    };

    return userResource;
});
