angular.module('app').controller('zApiNewCtrl', function ($scope, zUser, zNotifier, $location, zIdentity, zCommonUtil) {
    /* jshint newcap: false */
    $scope.user = new zUser({
        roles: ['api'],
        password: zCommonUtil.randomPw()
    });
    $scope.isSaving = false;
    $scope.canEdit = zIdentity.isAuthorized('owner', 'manager');
    
    $scope.validate = function(event, displayName) {
        var Regexp = /[!#$%&@'*+\/=?^_`{|}~-\s]+/g;
        var testResult = Regexp.test(displayName);

        if(testResult) {
            $scope.userForm.$invalid = true;
            $scope.spaceWarning = true;
        } else {
            $scope.spaceWarning = false;
        }
    };

    $scope.closeAlert = function() {
        $scope.spaceWarning = false;
    };

    $scope.saveUser = function() {
        $scope.user.email = $scope.user.displayName + '@' +
            zIdentity.getCurrentUser().currentSite + '.com';
        
        $scope.isSaving = true;
        $scope.user
            .$save()
            .then(function() {
                zNotifier.notify('New API Key created');
                $location.path('/settings/api');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
