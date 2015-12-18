angular.module('app').factory('zDashboardResource', function ($resource) {

	return {
		dashboard: $resource('/api/dashboard', {}, { 'update': { method:'PUT' }}),
		dashboards: $resource('/api/dashboards')
	};
});