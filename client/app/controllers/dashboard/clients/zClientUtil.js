angular.module('app').factory('zClientUtil', function() {
    return {
        dateOptions: {
            formatYear: 'yy',
            startingDate: 1
        },
        
        updateKnownAs: function(client) {
            if (!client.knownAs && client.firstName) {
                client.knownAs = client.firstName;
            }
        }
    };
});
