angular.module('app').controller('zResourceEditCtrl', function($scope, $routeParams, $location, $http, zResource, zUser, zNotifier, zIdentity) {
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    (function loadData() {
        zResource
            .get({ id: $routeParams.id })
            .$promise
            .then(function(resource) {
                zNotifier.notify('Ready to edit ' + resource.name);
                $scope.resource = resource;
                $scope.picInfo = {
                    id: resource._id,
                    type: 'resource',
                    cb: function() {
                        $scope.resource.pic = 's3';
                        $scope.imgChanged++;
                        $scope.isChangingPic = false;
                    }
                };
            })
            .then(function() {
                return zUser.query({
                    notLinkedToResources: true,
                    'in[]': $scope.resource.practitioner ? [$scope.resource.practitioner] : undefined,
                    'roles[]': ['owner', 'manager', 'admin', 'service provider', 'scheduler'] // TODO: move to config
                }).$promise;
            })
            .then(function(users) {
                $scope.practitioners = users;
                $scope.isLoading = false;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/appointments/settings/resources');
            });
    })();
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };
    
    $scope.saveResource = function() {
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
                zNotifier.notify('Resource updated');
                $location.path('/appointments/settings/resources');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
