angular.module('app').controller('zLostPasswordCtrl', function ($scope, $http, $routeParams, zNotifier, $location) {
    $scope.email = $routeParams.email;
    $scope.findUser = function () {
        $http
            .get('/api/users/findUserForPwReset?email=' + encodeURI($scope.email))
            .success(function (data) {
                if (data.displayName) {
                    zNotifier.info('Found your account ' + data.displayName);
                    $scope.resetPassword($scope.email);
                } else {
                    zNotifier.warning('Unable to find your account');
                }
            })
            .error(function (data) {
                zNotifier.warn(data.reason);
            });
    };

    $scope.resetPassword = function (email) {
        $http
            .post('/api/users/generatePwResetToken', {
                email: email
            })
            .success(function () {
                zNotifier.info('Follow link in email to reset password');
                $location.path('/login');
            })
            .error(function (data) {
                zNotifier.warning(data.reason);
            });
    };
});