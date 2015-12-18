angular.module('app').controller('zNavBarAccountCtrl', 
    function ($location, $scope, zNotifier, zIdentity, zAuth, zSite, zUserEchoService, zTheme, zDashboard) {
    $scope.identity = zIdentity;
    $scope.dashboards = [];

    zDashboard.getDashboards()
        .then(function(data) {
            $scope.dashboards = data;
            $scope.dashboard = _.find(data, 'name', zIdentity.getCurrentUser().activeRole);

            zDashboard.setActiveDashboard($scope.dashboard);
            zDashboard.setActiveDashboards($scope.dashboards);
        })
        .catch(function(err) {
            zNotifier.error('Can\'t load dashboards: ' + err);
        });


    // generate feedback
    zUserEchoService.getToken()
        .then(function(data) {
            var token = data.token;
            zUserEchoService.generateFeedback(token);
        })
        .catch(function(err) {
            zNotifier.error('Unable to generate feedback: ' + err);
        });
    
    zSite
        .refreshSites()
        .then(function() {
            $scope.sites = zSite.getAllSites();
            $scope.currentSite = zSite.getCurrentSite();
        });

    $scope.changeDashboard = zDashboard.setActiveDashboard;
    
    $scope.$watch(function() {
        return zDashboard.getActiveDashboard();
    }, function() {
        $scope.dashboard = zDashboard.getActiveDashboard();
    });

    $scope.logout = function () {
        zAuth.logoutUser();
        zNotifier.notify('You have successfully logged out');
        $location.url('/');
    };
    
    $scope.changeSite = function (site) {
        if (site._id !== zIdentity.getCurrentUser().currentSite) {
            zAuth
                .changeSite(site._id)
                .then(function() {
                    zNotifier.notify('Current site changed to ' + site.name);
                    return zSite.refreshSites(true);
                })
                .then(function() {
                    $scope.sites = zSite.getAllSites();
                    $scope.currentSite = zSite.getCurrentSite();
                    $location.path('/dashboard');

                    return zDashboard.getDashboards();
                })
                .then(function(dashboards) {
                    var dashboard;
                    
                    if(!dashboards.length) {
                        dashboard = zDashboard.getDefaultDashboard(zIdentity.getCurrentUser().activeRole);
                        zDashboard.createDashboard(dashboard);
                        dashboards.push(dashboard);
                    } else {
                        dashboard = dashboards[0];
                    }
                    
                    $scope.dashboard = dashboard;
                    $scope.dashboards = dashboards;

                    zDashboard.setActiveDashboard($scope.dashboard);
                    zDashboard.setActiveDashboards($scope.dashboards);
                
                })
                .catch(function (err) {
                    zNotifier.error('Unable to change site: ' + err);
                });
        }
    };
});