angular.module('app').factory('zResource', function($resource) {
    var resourceResource = $resource('/api/resources/:id/:action', 
        {
            id: '@_id'
        }, 
        {
            'update': {
                method: 'PUT',
                isArray: false
            },
            'updateRegions': {
                method: 'POST',
                url: '/api/resources/:id/regions'
            }
        }
    );
    return resourceResource;
});