angular.module('app').controller('zProfileDetailsCtrl', function($scope, $location, $routeParams, zIdentity, zUser, zResource, zNotifier) {
    $scope.isLoading = true;
    
    zUser
        .get({
            id: zIdentity.getCurrentUser()._id
        })
        .$promise
        .then(function(user) {
            $scope.user = user;
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/dashboard');
        });
});
