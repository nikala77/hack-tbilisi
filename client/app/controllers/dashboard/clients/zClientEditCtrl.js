angular.module('app').controller('zClientEditCtrl', function($scope, $routeParams, $location, zNotifier, zClientUtil, zClient) {
    /* jshint maxstatements: 20 */
    
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.dateOptions = zClientUtil.dateOptions;
    
    zClient
        .get({id: $routeParams._id})
        .$promise
        .then(function(client) {
            zNotifier.notify('Ready to edit ' + client.name);
            $scope.client = client;
            $scope.picInfo = {
                id: client._id,
                type: 'client',
                cb: function() {
                    $scope.client.pic = 's3';
                    $scope.imgChanged++;
                    $scope.isChangingPic = false;
                }
            };
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/clients');
        });
        
    $scope.updateKnownAs = function() {
        zClientUtil.updateKnownAs($scope.client);
    };
    
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };
    
    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };
    
    $scope.saveClient = function() {
        $scope.isSaving = true;
        $scope.client
            .$save()
            .then(function() {
                zNotifier.notify('Client is updated');
                $location.path('/clients/' + $scope.client._id);
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
