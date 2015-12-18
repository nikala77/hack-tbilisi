angular.module('app').controller('zUserListCtrl', function($scope, zUser, zIdentity) {
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    (function loadData() {
        zUser
            .query()
            .$promise
            .then(function(users) {
                $scope.users = users;
                _.each(users, function(user) {
                    if (user.siteRoles && user.siteRoles.length > 0) {
                        user.roles = user.siteRoles[0].roles;
                    }
                });
            });
    })();
});
