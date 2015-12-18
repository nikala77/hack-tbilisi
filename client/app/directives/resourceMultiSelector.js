angular.module('app').directive('resourceMultiSelector', function(zUser) {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            ngInitial: '=',
            onInitialize: '&',
            placeholder: '@'
        },
        controller: function($scope, $sce, zResource) {
            $scope.resources = [];
            zResource.query({ 'includes[]': ['practitioner'] }, function(resources) {
                $scope.resources = _.map(resources, function(resource) {
                    if (resource.practitioner) {
                        resource.practitionerName = zUser.getName(resource.practitioner);
                    }
                    return resource;
                });
                if ($scope.ngInitial) {
                    $scope.ngModel = $scope.ngInitial;
                }
                if ($scope.onInitialize) {
                    $scope.onInitialize();
                }
            });
            
            $scope.trustAsHtml = function(value) {
                return $sce.trustAsHtml(value);
            };
        },
        templateUrl: 'views/common/resourceMultiSelector.html'
    };
});
