angular.module('app').controller('zResourceEditRegionDialogCtrl', function ($scope, $modalInstance, $modal, region, colorpickerOpts) {
    $scope.region = region;
    $scope.colorpickerOpts = colorpickerOpts;
    
    $scope.delete = function () {
        $modal.open({
            templateUrl: 'views/common/confirmation-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function() {
                    return {
                        title: 'Delete ' + $scope.region.name + '?',
                        message: $scope.region.name + ' will be permanently deleted.'
                    };
                }
            }
        })
        .result
        .then(function() {
            $scope.region.isDeleted = true;
            $modalInstance.close($scope.region);
        });
    };
    
    $scope.save = function () {
        $modalInstance.close($scope.region);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
