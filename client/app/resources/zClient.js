angular.module('app').factory('zClient', function($resource) {
    var clientResource = $resource('/api/clients/:id/', {
        id: '@_id'
    });

    Object.defineProperty(clientResource.prototype, 'name', {
        get: function() {
            return this.knownAs ? 
                this.knownAs + ' ' + (this.lastName ? this.lastName : '') :
                this.firstName + ' ' + (this.lastName ? this.lastName : '');
        }
    });

    Object.defineProperty(clientResource.prototype, 'age', {
        get: function() {
            if (this.dob) {
                return (moment().year() - moment(this.dob).year());
            }
        }
    });
    
    clientResource.mapObjectsToResources = function(items) {
        return items.map(function(item) {
            /* jshint newcap: false */
            return new clientResource(item);
        });
    };
    
    clientResource.getName = function(client) {
        return client.knownAs ? 
            client.knownAs + ' ' + (client.lastName ? client.lastName : '') :
            client.firstName + ' ' + (client.lastName ? client.lastName : '');
    };

    return clientResource;
});
