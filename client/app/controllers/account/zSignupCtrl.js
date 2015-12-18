angular.module('app').controller('zSignupCtrl', function ($scope, zUser, zNotifier, $location, zAuth) {
    $scope.signup = function () {
        if ($scope.password !== $scope.repeatPassword) {
            zNotifier.error('Passwords don\'t match');
            return;
        }
        var newOwnerData = {
            email: $scope.email,
            password: $scope.password,
            displayName: $scope.displayName || $scope.email,
            siteName: $scope.siteName
        };
        
        zAuth
            .registerOwner(newOwnerData)
            .then(function () {
                zNotifier.notify('New account created - need to confirm email');
                $location.path('/signup-confirm');
            })
            .catch(function (err) {
                zNotifier.error(err.data.reason);
            });
    };
});