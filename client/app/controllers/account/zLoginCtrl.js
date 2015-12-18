angular.module('app').controller('zLoginCtrl', 
    function ($scope, $window, $http, zSite, zAuth, zIdentity, zNotifier, $location, zUser, zUserEchoService) {
    
    if (zIdentity.isAuthenticated()) {
        $location.url('/dashboard');
    }

    // generate feedback
    zUserEchoService.generateFeedback();

    $scope.signin = function (email, password) {
        zAuth
            .authenticateUser(email, password)
            .then(function () {
                zSite.refreshSites(true);
                zNotifier.notify('You have successfully logged in!');
                if ($location.search().redirect) {
                    $location.path(decodeURIComponent($location.search().redirect)).search({});
                } else {
                    $location.path('/dashboard');
                }
            })
            .catch(function(err) {
                if (err.status === 401) {
                    $scope.info = err.data.info;
                    switch (err.data.info.status) {
                    case 'no password':
                        zNotifier.warning('You haven\'t set your password');
                        break;
                    case 'un-verified owner':
                        zNotifier.warning('Account not verified');
                        break;
                    case 'un-verified user':
                        zNotifier.warning('You need to verify your account');
                        break;
                    case 'disabled':
                        zNotifier.error('Your account is currently disabled');
                        break;
                    case 'invalid un/pw':
                        zNotifier.error('Invalid username or password');
                        break;
                    }
                } else {
                    zNotifier.error('Unexpected server error');
                }
            });
    };

    $scope.resendOwnerEmail = function () {
        //$scope.user.$update({id: $scope.user._id, action: 'sendNewUserEmail'}).then(function() {
        //$http.get('/api/users/')
        zUser
            .get({
                id: $scope.info.userId,
                action: 'resendNewOwnerEmail'
            })
            .$promise
            .then(function () {
                zNotifier.notify('New owner email resent to ' + $scope.info.email);
                $scope.info.status = 'new owner email re-sent';
            })
            .catch(function (err) {
                zNotifier.error(err.data.reason);
            });
    };
});