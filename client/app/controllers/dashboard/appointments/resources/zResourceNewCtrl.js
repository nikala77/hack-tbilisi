angular.module('app').controller('zResourceNewCtrl', function($scope, $routeParams, $location, $http, zNotifier, zResource, zUser) {
    $scope.isSaving = false;
    
    (function loadData() {
        /* jshint newcap: false */
        $scope.resource = new zResource({ status: 'active' });
        
        zUser
            .query({
              notLinkedToResources: true,
              'roles': ['owner', 'manager', 'admin', 'service provider', 'scheduler'] // TODO: move to config
            })
            .$promise
            .then(function(users) {
                $scope.practitioners = users;
            });
    })();
    
    $scope.createResource = function() {
        $scope.isSaving = true;
        $scope.resource
            .$save()
            .then(function() {
                var practitioner = _.find($scope.practitioners, { _id: $scope.resource.practitioner });
                if (practitioner && practitioner.pic) {
                    var url = '/api/uploads/copy?srcId=:srcId&srcType=user&dstId=:dstId&dstType=resource'
                        .replace(':srcId', $scope.resource.practitioner)
                        .replace(':dstId', $scope.resource._id);
                    return $http.post(url);
                }
            })
            .then(function() {
                zNotifier.notify('Resource record created');
                $location.path('/appointments/settings/resources');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
