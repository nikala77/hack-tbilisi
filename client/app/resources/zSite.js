angular.module('app').factory('zSite', function ($resource, $http, $q, zIdentity) {
    var siteResource = $resource('/api/sites/:id/:action', 
        {
            id: '@_id'
        }, 
        {
            'update': {
                method: 'PUT',
                isArray: false
            }
        });

    var currentSite;
    var allSites;
    
    function refreshSites(fullRefresh) {
        if (zIdentity.getJwt() && (fullRefresh || !allSites)) {
            return $http
                .get('/api/sites')
                .then(function (responce) {
                    var sites = responce.data;
                    var currentSiteId = zIdentity.getCurrentUser().currentSite;
                    allSites = sites;
                    currentSite = _.find(sites, '_id', currentSiteId);
                });
        }
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
    }
    
    function getAllSites() {
        return allSites;
    }
    
    function getCurrentSite() {
        return currentSite;
    }
    
    return {
        siteResource: siteResource,
        getAllSites: getAllSites,
        getCurrentSite: getCurrentSite,
        refreshSites: refreshSites
    };
});