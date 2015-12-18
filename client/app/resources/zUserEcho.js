angular.module('app').factory('zUserEcho', function($resource) {

	var userEchoResource = $resource('/api/token/getUserEcho');

	return userEchoResource;
});