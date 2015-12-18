angular.module('app').controller('zApiDetailsCtrl', function ($scope, zUser, zNotifier, zIdentity, $routeParams, $location) {
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zUser
        .get({ id: $routeParams.id })
        .$promise
        .then(function (user) {
            $scope.user = user;
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/api');
        });

    // flash copy API Key
    var copyBtn = document.getElementById('copy-api');
    var copyAPI = new ZeroClipboard(copyBtn); // jshint ignore:line

    copyAPI.on('copy', function () {
        zNotifier.notify('API Key Copied!');
    });
});
