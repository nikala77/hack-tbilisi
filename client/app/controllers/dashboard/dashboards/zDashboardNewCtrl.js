angular.module('app').controller('zDashboardNewCtrl', function($scope, $location, zNotifier, zTheme, zDashboard) {
    
    $scope.themes = zTheme.getThemes();
    $scope.dashboard = zDashboard.getDefaultDashboard('owner');
    $scope.dashboards = zDashboard.getActiveDashboards();
    $scope.dashboard.name = '';

    if(!$scope.dashboards) {
        zDashboard.getDashboards()
            .then(function(data) {
                $scope.dashboards = data;
            })
            .catch(function(err) {
                zNotifier.error('Can\'t load dashboards: ' + err);
            });
    }

    $scope.createDashboard = function() {
        zDashboard.createDashboard($scope.dashboard)
            .then(function(data) {
                $scope.dashboard._id = data._id;
                $scope.dashboards.push($scope.dashboard);

                zDashboard.setActiveDashboard($scope.dashboard);
                zDashboard.setActiveDashboards($scope.dashboards);

                zNotifier.notify(data.message);

                $location.path('/dashboard/dashboards');
            })
            .catch(function(err) {
                zNotifier.error('Can\'t save new Dashboard, \n'+ err.data.reason);
            });
    };
    
});