angular.module('app').controller('zDashboardListCtrl', function($scope, $location, $modal, zNotifier, zTheme, zDashboard, zIdentity) { // jshint ignore:line
    $scope.dashboards = zDashboard.getActiveDashboards();
    
    if(!$scope.dashboards) {
        zDashboard.getDashboards()
        .then(function(data) {
            $scope.dashboards = data;
            $scope.dashboard = _.find(data, 'name', zIdentity.getCurrentUser().activeRole);
        })
        .catch(function(err) {
            zNotifier.error('Can\'t load dashboards: ' + err);
        });
    } else {
        $scope.dashboard = _.find($scope.dashboards, 'name', zIdentity.getCurrentUser().activeRole);
    }


    // dropdown themes
    $scope.themes = zTheme.getThemes();

    $scope.changeDashboard = function(dashboard) {
    	zDashboard.setActiveDashboard(dashboard);
    	$scope.dashboard = zDashboard.getActiveDashboard();
    };

    $scope.setTheme = function(dashboard, theme) {
        $scope.selectedTheme = theme;
        dashboard.theme = theme;
        zTheme.setCurrentTheme(theme);
    };


    $scope.addWidget = function(dashboard, widget) {
        var left  = _.find(dashboard.widgets.left, 'name', widget.name);
        var right = _.find(dashboard.widgets.right, 'name', widget.name);
        
        if(!left && !right) {
            dashboard.widgets.left.push(widget);
        }        
    };

    $scope.removeLeftWidget = function(dashboard, index) {
        _.pullAt(dashboard.widgets.left, index);
    };

    $scope.removeRightWidget = function(dashboard, index) {
        _.pullAt(dashboard.widgets.right, index);
    };

    $scope.save = function(dashboard) {
        zDashboard.updateDashboard(dashboard)
            .then(function(data) {
                zNotifier.notify(data.message);
                zDashboard.setActiveDashboard(dashboard);
                $location.path('/dashboard');
            })
            .catch(function(err) {
                zNotifier.error('Error Occured While Saving Theme: ' + err);
            });
    };

    $scope.cancel =  function(dashboard) {
        zDashboard.getDashboard(dashboard.name)
            .then(function(dashboard) {
                $scope.selectedTheme = dashboard.theme;
                dashboard.theme = dashboard.theme;
                zTheme.setCurrentTheme(dashboard.theme);
                $location.path('/dashboard');
            })
            .catch(function(err) {
                zNotifier.error('Error Ocured While Loading Theme: ' + err);
            });
    };

    $scope.delete = function(dashboardName) {
    	if($scope.dashboards.length === 1) {
    		$modal.open({
				templateUrl: 'delete_dashboard_warning',
				controller: 'zModalCtrl',
				resolve: {
					items: function () {
						return 'no items';
					}
				}
			});
            return;
        }
        var result = $modal.open({
            templateUrl: 'delete_dashboard',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return true;
                }
            }
        });

        result.result.then(function () {
            zDashboard.deleteDashboard(dashboardName)
                .then(function() {
                    _.remove($scope.dashboards, 'name', dashboardName);

                    zDashboard.setActiveDashboard($scope.dashboards[0]);
                    zDashboard.setActiveDashboards($scope.dashboards);

                    zNotifier.notify('Dashboard has removed successfully');
                    $location.path('/dashboard');
                })
                .catch(function(err) {
                    zNotifier.error('Can\'t remove dashboard '+ err);
                });
        });
    };
    
    $scope.widgets = [{
        name: 'Appointments'
    }, {
        name: 'Site info'
    }, {
        name: 'Performance'
    }, {
        name: 'ToDos'
    }, {
        name: 'Messages'
    }, {
        name: 'Client'
    }];

    $scope.selectedWidget = {};


    // Model to JSON for demo purpose
    // $scope.$watch('dashboards', function(model) {
    //     $scope.modelAsJson = angular.toJson(model, true);
    // }, true);
});