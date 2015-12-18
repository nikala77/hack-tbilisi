angular.module('app').controller('zAppointmentNewDialogCtrl', function(
    $scope, $modalInstance, $q, zIdentity, zNotifier, zCommonUtil, zAppointmentUtil, zAppointmentTemplate, zAppointment, params) {
    /* jshint maxstatements: 17 */
    
    $scope.canEdit = true; // TODO: check roles
    $scope.canEditTemplate = zIdentity.isAuthorized(['manager']);
    $scope.dateOptions = zAppointmentUtil.dateOptions;
    $scope.tpOptions = zAppointmentUtil.tpOptions;
    $scope.colorpickerOpts = zAppointmentUtil.colorpickerOpts;
    $scope.isTemplateEdited = true;
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
        var startDate = params.startDate.local();
        
        /* jshint newcap: false */
        $scope.appointment = new zAppointment({
            color: '#39CCCC',
            start: startDate.toDate(),
            duration: 0,
            resources: params.resources,
            clients: params.clients
        });
        
        zAppointmentUtil
            .loadCollections()
            .then(function(data) {
                $scope.resources = data.resources;
                $scope.clients = data.clients;
            })
            .then(function() {
                return zAppointmentTemplate
                .query({ 'includes[]': ['resources'] })
                .$promise;
            })
            .then(function(templates) {
                $scope.templates = zAppointmentUtil.prepareAppointmentTemplates(templates);
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
                zNotifier.notify('Appointment record created');
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
