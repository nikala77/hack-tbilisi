angular.module('app').factory('zResourceWeekAvTimes', function($resource) {
    var resourceWeekAvTimesResource = $resource('/api/resourceWeekAvTimes/',
        null, 
        {
            'clone': {
                method: 'POST',
                url: '/api/resourceWeekAvTimes/:id/clone'
            }
        }
    );
    return resourceWeekAvTimesResource;
});