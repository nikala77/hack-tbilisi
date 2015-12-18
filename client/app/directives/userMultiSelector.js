angular.module('app').directive('userMultiSelector', function() {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            placeholder: '@'
        },
        controller: function($scope, zUser, $sce) {
            $scope.users = [];
            zUser.query(function(users) {
                $scope.users = users;
            });

            $scope.trustAsHtml = function(value) {
                return $sce.trustAsHtml(value);
            };
        },
        templateUrl: 'views/common/userMultiSelector.html'
    };
});
