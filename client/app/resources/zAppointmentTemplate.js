angular.module('app').factory('zAppointmentTemplate', function($resource) {
    var appointmentTemplateResource = $resource('/api/appointmentTemplates/:id/', { id: '@_id' });
    return appointmentTemplateResource;
});