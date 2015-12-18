angular.module('app').directive('clientMultiSelector', function() {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            ngInitial: '=',
            onInitialize: '&',
            placeholder: '@'
        },
        controller: function($scope, $http, $sce, zClient) {
            $scope.clients = [];
            zClient.query(function(clients) {
                $scope.clients = clients;
                if ($scope.ngInitial) {
                    $scope.ngModel = $scope.ngInitial;
                }
                if ($scope.onInitialize) {
                    $scope.onInitialize();
                }
            });
            
            $scope.refreshClients = function(q) {
                if (!q || q.length < 1) {
                    return;
                }
                $scope.clients = [];
                return $http
                    .get('/api/clients/search', {
                        params: {
                            q: q,
                            exclude: $scope.ngModel
                        }
                    })
                    .then(function(response) {
                        $scope.clients = zClient.mapObjectsToResources(response.data);
                    });
            };

            $scope.trustAsHtml = function(value) {
                return $sce.trustAsHtml(value);
            };
        },
        templateUrl: 'views/common/clientMultiSelector.html'
    };
});
