angular.module('app').controller('zTokenCtrl', function($scope, $routeParams, zToken, zNotifier, $http, $location) {
    zToken.get({id: $routeParams.id}, function(tokenData) {
        if (tokenData) {
            $scope.data = tokenData;
            switch (tokenData.tokenType) {
                case 'newOwner':
                case 'newUser':
                    zNotifier.notify('You are now verified');
                    break;
                case 'emailChange':
                    zNotifier.notify('Email address updated');
                    break;
                case 'passwordReset':
                    zNotifier.notify('Enter your password');
                    break;
            }

        }
    }, function(body) {
        zNotifier.error(body.data.reason);
        $scope.reason = body.data.reason;
    });

    $scope.setPassword = function(password, repeatPassword) {
        if (password !== repeatPassword) {
            return zNotifier.warn('Passwords don\'t match');
        }
        $http.post('/api/users/' + $scope.data.userId + '/setPassword', {password: password}).then(function() {
            zNotifier.notify('Password set');
            $location.path('/login');
        }, function(res) {
            zNotifier.error(res.data.reason);
        });
    };
});