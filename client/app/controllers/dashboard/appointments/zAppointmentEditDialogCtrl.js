angular.module('app').controller('zAppointmentEditDialogCtrl', function(
    $scope, $modalInstance, zIdentity, zNotifier, zCommonUtil, zAppointmentUtil, zAppointmentTemplate, zAppointment, params) {
    /* jshint maxstatements: 17 */
    
    $scope.canEdit = true; // TODO: check roles
    $scope.canEditTemplate = zIdentity.isAuthorized(['manager']);
    $scope.dateOptions = zAppointmentUtil.dateOptions;
    $scope.tpOptions = zAppointmentUtil.tpOptions;
    $scope.colorpickerOpts = zAppointmentUtil.colorpickerOpts;
    $scope.isTemplateEdited = false;
    $scope.isLoading = true;
    
    $scope.createClient = function() {
        zAppointmentUtil
            .createClient()
            .then(function(client) {
                $scope.appointment.clients.push(client);
            });
    };
    
    $scope.saveAsTemplate = function() {
        alert('Not implemented');
    };
    
    $scope.replaceTemplate = function() {
        alert('Not implemented');
    };
    
    $scope.save = function () {
        _saveAppointment()
            .then($modalInstance.close)
            .catch(function(err) {
                var msg = zCommonUtil.getErrorMessage(err);
                zNotifier.error('Unable to save record: ' + msg);
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.$watch('appointment.appointmentTemplate', function(newTemplate) {
        if ($scope.isTemplateEdited && newTemplate && newTemplate._id) {
            $scope.isTemplateEdited = false;
            zAppointmentUtil.applyAppointmentTemplate($scope.appointment, $scope.resources, newTemplate);
        }
    });
    
    $scope.templateChanged = function() {
        $scope.isTemplateEdited = true;
    };

    (function _loadData() {
        zAppointmentUtil
            .loadCollections()
            .then(function(data) {
                $scope.resources = data.resources;
                $scope.clients = data.clients;
            })
            .then(function() {
                return zAppointment
                    .get({
                        id: params._id,
                        'includes[]': ['appointmentTemplate']
                    })
                    .$promise;
            })
            .then(function(appointment) {
                // TODO: improve
                $scope.appointment = appointment;
                $scope.appointment.selectedResources = [];
                $scope.appointment.selectedClients = [];
                zAppointmentUtil.selectItems($scope.appointment.resources, $scope.resources);
                zAppointmentUtil.selectItems($scope.appointment.clients, $scope.clients);
            })
            .then(function() {
                return zAppointmentTemplate
                    .query({ 'includes[]': ['resources'] })
                    .$promise;
            })
            .then(function(templates) {
                $scope.templates = zAppointmentUtil.prepareAppointmentTemplates(templates);
                if ($scope.appointment.appointmentTemplate) {
                    var templateId = $scope.appointment.appointmentTemplate._id;
                    $scope.appointment.appointmentTemplate = _.find(templates, { _id: templateId }) || null;
                }
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    })();
    
    function _saveAppointment() {
        if ($scope.appointment.start < moment().toDate()) {
            return $q.reject(new Error('Can\'t create appointment in the past'));
        }
        
        $scope.isSaving = true;
        var appointmentForSave = zAppointmentUtil.prepareAppointmentForSave($scope.appointment);
        return appointmentForSave
            .$save()
            .then(function() {
                zNotifier.notify('Appointment record updated');
                return zAppointmentUtil.prepareAppointment(appointmentForSave);
            })
            .catch(function(err) {
                zNotifier.error('Unable to save appointment: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    }
});
