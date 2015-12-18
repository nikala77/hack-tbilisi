angular.module('app').controller('zAppointmentTemplateEditCtrl', function(
    $scope, $routeParams, $location, zNotifier, zAppointmentTemplateUtil, zAppointmentTemplate, zResource, zIdentity) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    $scope.colorpickerOpts = zAppointmentTemplateUtil.colorpickerOpts;
    
    $scope.appointmentTemplate = {};
    $scope.appointmentTemplate.resources = [];

    zAppointmentTemplate
        .get({ id: $routeParams.id })
        .$promise
        .then(function(appointmentTemplate) {
            $scope.appointmentTemplate = appointmentTemplate;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/appointments/settings/templates');
        })
        .finally(function() {
            $scope.isLoading = false;
        });
    
    $scope.saveAppointmentTemplate = function() {
        $scope.isSaving = true;
        $scope.appointmentTemplate
            .$save()
            .then(function() {
                zNotifier.notify('Appointment template updated');
                $location.path('/appointments/settings/templates');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

//    function applyTemplateToScope(appointmentTemplate) {
//        zResource.query(function(resources) {
//            extendTemplate(appointmentTemplate, resources);
//            $scope.appointmentTemplate = appointmentTemplate;
//            $scope.resources = resources;
//        });
//    }

//    function extendTemplate(appointmentTemplate, resources) {
//        var lookup = {};
//        for (var i = 0, len = resources.length; i < len; i++) {
//            lookup[resources[i]._id] = resources[i];
//        }
//
//        var resourceIds = angular.copy(appointmentTemplate.resources);
//        appointmentTemplate.resources = [];
//        for (var i=0; i<resourceIds.length; i++) {
//            appointmentTemplate.resources.push(lookup[resourceIds[i]]);
//        }
//    };
});
