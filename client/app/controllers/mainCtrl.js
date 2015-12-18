angular.module('app').controller('zMainCtrl', function ($window, $scope, zTheme) {

	var theme = $window.localStorage.theme;

	if(theme) {
		theme = _.find(zTheme.getThemes(), 'name', theme);
		zTheme.setCurrentTheme(theme);
	}

	$scope.$watch(function() {
		return zTheme.getCurrentTheme();
	}, function() {
		$scope.theme = zTheme.getCurrentTheme();
	});
});