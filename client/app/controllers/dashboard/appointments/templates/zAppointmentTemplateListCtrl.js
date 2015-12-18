angular.module('app').controller('zAppointmentTemplateListCtrl', function(
    $scope, zNotifier, zIdentity, zAppointmentTemplate) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zAppointmentTemplate
        .query({
            'includes[]': ['resources']
        })
        .$promise
        .then(function(ats) {
            _.each(ats, function(at) {
                at.resources = _.pluck(at.resources, 'name').join(', ');
            });
            $scope.appointmentTemplates = ats;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load items: ' + err.data.reason);
        })
        .finally(function() {
            $scope.isLoading = false;
        });
});
