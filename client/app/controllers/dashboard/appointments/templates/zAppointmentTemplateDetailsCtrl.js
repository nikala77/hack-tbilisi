angular.module('app').controller('zAppointmentTemplateDetailsCtrl', function(
    $scope, $location, $routeParams, zNotifier, zIdentity, zAppointmentTemplate) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zAppointmentTemplate
        .get({
            id : $routeParams.id,
            'includes[]': ['resources']
        })
        .$promise
        .then(function(at) {
            at.resources = _.pluck(at.resources, 'name').join(', ');
            $scope.appointmentTemplate = at;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/appointments/settings/appointmentTemplates');
        })
        .finally(function() {
            $scope.isLoading = false;
        });
});
