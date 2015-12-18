angular.module('app').controller('zUserEditCtrl', function (
    $scope, $routeParams, $modal, $location, $http, zCommonUtil,
    zNotifier, zIdentity, zUser, zResource, zAuth) {
    
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.canEdit = zIdentity.isAuthorized('owner', 'manager');
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    $scope.roles = ['owner', 'manager', 'admin', 'service provider', 'scheduler'];
    if (zIdentity.getCurrentUser().roles.indexOf('owner') === -1) {
        $scope.roles = _.without($scope.roles, 'owner');
    }
    
    (function loadData() {
        zUser
            .get({ id: $routeParams.id })
            .$promise
            .then(function(user) {
                zNotifier.notify('Ready to edit ' + user.name);
                $scope.user = user;
                // TODO: temporary fix:
                var clinicalRoleIndex = _.indexOf($scope.user.roles, 'clinical');
                if (clinicalRoleIndex !== -1) {
                    $scope.user.roles[clinicalRoleIndex] = 'service provider';
                }
                $scope.picInfo = {
                    id: user._id,
                    type: 'user',
                    cb: function() {
                        $scope.user.pic = 's3';
                        $scope.imgChanged++;
                        $scope.isChangingPic = false;
                        if ($scope.user.linkedResource) {
                            var url = '/api/uploads/copy?srcId=:srcId&srcType=user&dstId=:dstId&dstType=resource'
                                .replace(':srcId', $scope.user._id)
                                .replace(':dstId', $scope.user.linkedResource);
                            return $http.post(url);
                        }
                    }
                };
                return user;
            })
            .then(function() {
                return zResource.query().$promise;
            })
            .then(function(resources) {
                $scope.resources = _.filter(resources, function(resource) {
                    return !resource.practitioner || resource.practitioner === $scope.user._id;
                });
                var linkedResource = _.find(resources, { practitioner: $scope.user._id });
                $scope.user.linkedResource = linkedResource ? linkedResource._id : null;
                $scope.isLoading = false;
            })
            .catch(function (err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/settings/users');
            });
    })();
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };

    $scope.saveUser = function() {
        $scope.isSaving = true;
        $scope.user
            .$update()
            .then(function () {
                if ($scope.user._id === zIdentity.getCurrentUser()._id) {
                    return zAuth.refreshJwt();
                }
            })
            .then(function() {
                zNotifier.notify('User updated successfully');
                $location.path('/settings/users');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

    $scope.deleteUser = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/settings/users/delete-user-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return $scope.user;
                }
            }
        });
        
        $scope.isSaving = true;
        modalInstance.result
            .then(function () {
                return $scope.user.$remove({
                    id: $scope.user._id
                });
            })
            .then(function () {
                zNotifier.notify('User deleted');
                $location.path('/settings/users');
            })
            .catch(function (err) {
                if (err !== 'cancel') {
                    zNotifier.error('Unable to delete record: ' + err.data.reason);
                }
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

    $scope.resendInviteEmail = function () {
        $scope.isSaving = true;
        $scope.user
            .$update({
                id: $scope.user._id,
                action: 'sendNewUserEmail'
            })
            .then(function () {
                zNotifier.notify('New user email resent to ' + $scope.user.email);
                $location.path('/settings/users');
            })
            .catch(function (err) {
                zNotifier.error('Unable to resend invate email: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});