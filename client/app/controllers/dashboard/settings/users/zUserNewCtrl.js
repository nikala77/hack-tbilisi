angular.module('app').controller('zUserNewCtrl', function ($scope, $location, zCommonUtil, zNotifier, zUser, zResource, zIdentity) {
    /* jshint newcap: false */
    $scope.user = new zUser();
    $scope.isSaving = false;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    $scope.roles = ['owner', 'manager', 'admin', 'service provider', 'scheduler'];
    if (zIdentity.getCurrentUser().roles.indexOf('owner') === -1) {
        $scope.roles = _.without($scope.roles, 'owner');
    }
    
    (function loadData() {
        zResource
            .query({ practitioner: null })
            .$promise
            .then(function(resources) {
                $scope.resources = _.filter(resources, function(resource) {
                    return !resource.practitioner;
                });
            });
    })();
    
    $scope.createUser = function () {
        $scope.isSaving = true;
        $scope.user
            .$save()
            .then(function () {
                zNotifier.notify('New user created successfully. Email sent to ' + $scope.user.email);
                $location.path('/settings/users');
            })
            .catch(function (err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
