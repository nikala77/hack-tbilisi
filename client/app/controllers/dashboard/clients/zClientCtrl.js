angular.module('app').controller('zClientCtrl', function($scope, zClient, $http, $location, $routeParams, zNotifier) {
    $scope.focusClientSearchbox = true;
    
    $scope.searchClients = function(q) {
        if (!q || q.length === 0) {
            return;
        }
        return $http
            .get('/api/clients/search', {
                params: {
                    q: q
                }
            })
            .then(function(response) {
                return zClient.mapObjectsToResources(response.data);
            });
    };
    
    $scope.$watch('selectedClient', function(newValue) {
        if (newValue && newValue._id && newValue !== $scope.client) {
            $location.path('/clients/' + newValue._id);
        }
    });
    
    $scope.clearSearch = function() {
        $scope.selectedClient = null;
        $scope.focusClientSearchbox = true;
    };
    
    $scope.showMore = function() {
        $scope.isDisplayAdditional = true;
    };
    
    $scope.smsIcal = function() {
        // TODO: test
        $http
            .post('/api/messages/smsical/client/' + $scope.client._id)
            .then(function() {
                zNotifier.notify('Calendar sent in sms to ' + $scope.client.mobile);
            })
            .catch(function(err) {
                zNotifier.error('Umm... can\'t send sms: ' + err.data.reason);
            });
    };
    
    if ($routeParams._id) {
        loadClient($routeParams._id);
    }
    
    function loadClient(_id) {
        zClient
            .get({
                id: _id
            })
            .$promise
            .then(function(client) {
                zNotifier.notify('Record loaded for ' + client.name);
                $scope.client = client;
                $scope.selectedClient = client;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/clients');
            });
    }
});
