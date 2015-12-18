angular.module('app').controller('zSiteNewCtrl', function($scope, zNotifier, $location, zCommonUtil, zSite) {
    /* jshint newcap: false */
    $scope.site = new zSite.siteResource();
    $scope.isSaving = false;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    $scope.createSite = function() {
        $scope.isSaving = true;
        $scope.site
            .$save()
            .then(function () {
                zNotifier.notify('New site created successfully');
                $location.path('/settings/sites');
            })
            .catch(function (err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
