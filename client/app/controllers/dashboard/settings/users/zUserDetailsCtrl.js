angular.module('app').controller('zUserDetailsCtrl', function($scope, $location, $routeParams, zIdentity, zUser, zResource, zNotifier) {
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zUser
        .get({ id : $routeParams.id })
        .$promise
        .then(function(user) {
            $scope.user = user;
            $scope.user.roles = $scope.user.roles.join(', ');
            return user;
        })
        .then(function(user) {
          return zResource.query({
                practitioner: user._id
            }).$promise;
        })
        .then(function(resources) {
            if (resources.length > 0) {
                $scope.user.linkedResource = resources[0];
            }
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/users');
        });
});
