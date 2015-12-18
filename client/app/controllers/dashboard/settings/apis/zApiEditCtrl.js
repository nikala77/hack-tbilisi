angular.module('app').controller('zApiEditCtrl', function ($scope, zUser, $routeParams, zNotifier, $location, zIdentity, zCommonUtil, $modal) {
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.canEdit = zIdentity.isAuthorized('owner', 'manager');
    
    (function loadData() {
        zUser
            .get({ id: $routeParams.id })
            .$promise
            .then(function(user) {
                $scope.user = user;
                $scope.isLoading = false;
            })
            .catch(function (err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/settings/api');
            });
    })();
    
    $scope.saveUser = function() {
        $scope.isSaving = true;
        $scope.user
            .$update()
            .then(function () {
                zNotifier.notify('API Key updated successfully');
                $location.path('/settings/api');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
    
    $scope.deleteUser = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/settings/users/delete-user-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return $scope.user;
                }
            }
        });
        
        $scope.isSaving = true;
        modalInstance.result
            .then(function () {
                return $scope.user.$remove({ id: $scope.user._id });
            })
            .then(function () {
                zNotifier.notify('API Key deleted successfully');
                $location.path('/settings/api');
            })
            .catch(function (err) {
                if (err !== 'cancel') {
                    zNotifier.error('Unable to delete: ' + err.data.reason);
                }
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
    
    $scope.regenerateKey = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/settings/apis/api-regenerate-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return $scope.user;
                }
            }
        });
        
        $scope.isSaving = true;
        modalInstance.result
            .then(function () {
                $scope.user.password = zCommonUtil.randomPw();
                return $scope.user.$update();
            })
            .then(function() {
                zNotifier.notify('API Key regenerated successfully');
                $location.path('/settings/api/' + $routeParams.id);
            })
            .catch(function (err) {
                if (err !== 'cancel') {
                    zNotifier.error('Regeneration failed: ' + err.data.reason);
                }
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
