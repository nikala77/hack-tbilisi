angular.module('app').controller('zSiteEditCtrl', function($scope, $location, zNotifier, $routeParams, zCommonUtil, zSite, zIdentity) {
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    zSite.siteResource
        .get({id : $routeParams.id})
        .$promise
        .then(function(site) {
            $scope.site = site;
            $scope.canDelete = site._id !== zIdentity.getCurrentUser().currentSite;
            $scope.picInfo = {
                id: site._id,
                type: 'site',
                cb: function() {
                    $scope.site.pic = 's3';
                    $scope.imgChanged++;
                    $scope.isChangingPic = false;
                }
            };
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/sites');
        });
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };

    $scope.saveSite = function() {
        $scope.isSaving = true;
        $scope.site
            .$update()
            .then(function() {
                zSite.refreshSites(true);
                zNotifier.notify('Site updated successfully');
                $location.path('/settings/sites');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

    $scope.deleteSite = function() {
        $scope.isSaving = true;
        $scope.site
            .$delete(function() {
                zSite.refreshSites(true);
                zNotifier.notify('Site deleted successfully');
                $location.path('/settings/sites');
            })
            .catch(function(err) {
                zNotifier.error('Unable to delete record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
