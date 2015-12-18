angular.module('app').controller('zAppointmentTemplateNewCtrl', function(
    $scope, $location, zNotifier, zIdentity, zAppointmentTemplateUtil, zAppointmentTemplate) {
    
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    $scope.colorpickerOpts = zAppointmentTemplateUtil.colorpickerOpts;
    /* jshint newcap: false */
    $scope.appointmentTemplate = new zAppointmentTemplate({
        resources: [],
        duration: 10,
        color: '#39CCCC'
    });
    
    $scope.createAppointmentTemplate = function() {
        $scope.isSaving = true;
        $scope.appointmentTemplate
            .$save()
            .then(function() {
                zNotifier.notify('Appointment template record created');
                $location.path('/appointments/settings/templates');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
});
