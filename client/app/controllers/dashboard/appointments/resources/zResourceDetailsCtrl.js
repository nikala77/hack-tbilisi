angular.module('app').controller('zResourceDetailsCtrl', function(
    $scope, $location, $routeParams, zResource, zUser, zNotifier, zIdentity) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zResource
        .get({ id : $routeParams.id })
        .$promise
        .then(function(resource) {
            $scope.resource = resource;
        })
        .then(function() {
            if ($scope.resource.practitioner) {
                return zUser.get({ id: $scope.resource.practitioner }).$promise;
            }
        })
        .then(function(practitioner) {
            if (practitioner) {
                $scope.resource.practitioner = practitioner;
            }
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/appointments/settings/resources');
        });
});
