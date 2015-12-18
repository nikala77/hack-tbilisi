angular.module('app').factory('zAppointment', function($resource) {
    var appointmentResource = $resource('/api/appointments/:id/:action', 
        {
            id: '@_id'
        },
        {
            'update': {
                method: 'PUT',
                isArray: false
            },
            'updateDates': {
                method: 'POST',
                url: '/api/appointments/:id/dates'
            }
        });
    /*
    TODO: delete?
    Object.defineProperty(appointmentResource.prototype, 'title', {
        get: function() {
            return this.appointmentTypeName;
        }
    });

    // TODO: move to util?
    Object.defineProperty(appointmentResource.prototype, 'id', {
        get: function() {
            return this._id;
        }
    });

    Object.defineProperty(appointmentResource.prototype, 'editable', {
        get: function() {
            return true;
        }
    });

    Object.defineProperty(appointmentResource.prototype, 'ignoreTimezone', {
        get: function() {
            return true;
        }
    });
    */
    return appointmentResource;
});