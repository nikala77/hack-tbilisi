angular.module('app').factory('zToken', function($resource) {
    var tokenResource = $resource('/api/token/:id', {id : '@id'});
    return tokenResource;
});