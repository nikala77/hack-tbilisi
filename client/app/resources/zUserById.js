angular.module('app').factory('zUserById', function($resource) {
    var userResource = $resource('/api/users/:_id',
        {
            id: '@_id'
        }
    );

    return userResource;
});
