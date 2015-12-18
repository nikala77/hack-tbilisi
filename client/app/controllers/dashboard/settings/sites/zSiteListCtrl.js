angular.module('app').controller('zSiteListCtrl', function($scope, zSite) {
    $scope.sites = zSite.siteResource.query();
});