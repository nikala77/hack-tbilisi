angular.module('app').controller('zSiteDetailsCtrl', function($scope, $routeParams, $location, zNotifier, zSite, zUser) {
    $scope.isLoading = true;
    
    zSite.siteResource
        .get({id : $routeParams.id})
        .$promise
        .then(function(site) {
            $scope.site = site;
            return site;
        })
        .then(function() {
            return zUser.query().$promise;
        })
        .then(function(users) {
            $scope.site.users = users;
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/sites');
        });
});
