angular.module('app').controller('zResourceListCtrl', function($scope, zResource, zUser, zIdentity) {
    zResource
        .query({ 'includes[]': ['practitioner'] })
        .$promise
        .then(function(resources) {
            _.each(resources, function(resource) {
                if (resource.practitioner) {
                    resource.practitionerName = zUser.getName(resource.practitioner);
                }
            });
            $scope.resources = resources;
        });
    
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
});
