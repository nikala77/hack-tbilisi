angular.module('app').controller('zSignupConfirmCtrl', function($scope, zIdentity) {
    $scope.user = zIdentity.getCurrentUser();
});