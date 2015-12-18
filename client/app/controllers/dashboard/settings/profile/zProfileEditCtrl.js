angular.module('app').controller('zProfileEditCtrl', function ($scope, $location, zAuth, zNotifier, zCommonUtil, zIdentity, zUser) {
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    $scope.isMismatchPasswords = false;
    
    var origEmail;
    zUser
        .get({
            id: zIdentity.getCurrentUser()._id
        })
        .$promise
        .then(function(user) {
            $scope.user = user;
            origEmail = user.email;
            $scope.picInfo = {
                id: user._id,
                type: 'user',
                cb: function() {
                    $scope.user.pic = 's3';
                    $scope.imgChanged++;
                    $scope.isChangingPic = false;
                }
            };
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/profile');
        });
        
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };
    
    $scope.update = function () {
        $scope.isMismatchPasswords = $scope.user.password !== $scope.repeatPassword;
        if ($scope.isMismatchPasswords) {
            return zNotifier.error('Passwords don\'t match');
        }
        
        $scope.isSaving = true;
        var user;
        $scope.user
            .$update()
            .then(function (u) {
                user = u;
                return zAuth.refreshJwt();
            })
            .then(function() {
                if (user.email !== origEmail) {
                    zNotifier.info('Check email to confirm address change to ' + user.email);
                } else {
                    zNotifier.notify('Your profile has been updated');
                }
                $location.path('/settings/profile');
            })
            .catch(function (err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            });
    };
});
