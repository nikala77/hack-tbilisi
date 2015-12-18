angular.module('app').controller('zModalCtrl', function ($scope, $modalInstance, items, zDashboard, zIdentity) {
    $scope.items = items;

    $scope.dashboard = zIdentity.getCurrentUser().activeRole;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
