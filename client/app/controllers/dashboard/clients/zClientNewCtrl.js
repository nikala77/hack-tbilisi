angular.module('app').controller('zClientNewCtrl', function($scope, $location, zNotifier, zClientUtil, zClient) {
    /* jshint newcap: false */
    $scope.client = new zClient({ status: 'active' });
    $scope.isSaving = false;
    $scope.dateOptions = zClientUtil.dateOptions;
    
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.updateKnownAs = function() {
        zClientUtil.updateKnownAs($scope.client);
    };
    
    $scope.createClient = function() {
        $scope.isSaving = true;
        $scope.client
            .$save()
            .then(function(client) {
                zNotifier.notify('Client is created');
                $location.path('/clients/' + client._id);
            })
            .catch(function(err) {
                zNotifier.error('Unable to create new record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
