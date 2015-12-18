var appointmentsSrvc = require('../services/appointments');
var usersSrvc        = require('../services/users');
var Site             = require('mongoose').model('site');

// TODO: test it
exports.getSite = function(params, keys) {
    keys = keys || '_id';
    return Site
        .findOne(params)
        .select(keys)
        .execAsync();
};

// TODO: test it
exports.getSites = function(params, keys) {
    keys = keys || '_id';
    return Site
        .find(params)
        .select(keys)
        .sort('name')
        .execAsync();
};

// TODO: test it
exports.createSite = function(siteData, user) {
    return Site
        .createAsync(siteData)
        .then(function(newSite) {
            return exports.addSiteToUser(newSite, user, ['owner', 'manager', 'admin', 'service provider']);
        });
};

// TODO: test it
exports.saveSite = function(site) {
    return site
        .saveAsync()
        .spread(function(site) {
            return site;
        });
};

// TODO: test it
exports.addSiteToUser = function(site, user, roles) {
    user.siteRoles.push({
        site: site,
        roles: roles
    });
    
    return usersSrvc
        .saveUser(user)
        .then(function() {
            // site.users.push(user);
            return exports.saveSite(site);
        });
};

// TODO: test it
exports.deleteSite = function(site) {
    return siteHasNoAppointments(site)
        .then(removeSiteFromUsers)
        .then(removeSite);

    function removeSite(site) {
        return site.removeAsync();
    }

    function siteHasNoAppointments(site) {
        return appointmentsSrvc
            .listAppointments({
                site: site
            })
            .then(function(appointments) {
                if (appointments.length > 0) {
                    throw new Error('Cannot delete site with appointments');
                }
                return site;
            });
    }

    //caused circular reference with clientSrvce and sync
    // function siteHasNoClients(site) {
    //     return clientsSrvc.listClients({
    //         site: site
    //     })
    //         .then(function (clients) {
    //             if (clients.length > 0) throw new Error('Cannot delete site with clients');
    //             return site;
    //         });

    // }

    function removeSiteFromUsers(site) {
        return usersSrvc
            .getUsers({
                'siteRoles.site': site
            })
            .then(function(users) {
                return users;
            })
            .map(function(user) {
                for (var j = 0; j < user.siteRoles.length; j++) {
                    if (user.siteRoles[j].site.toString() === site._id.toString()) {
                        user.siteRoles.splice(j, 1);
                        break;
                    }
                }
                return user.saveAsync();
            })
            .then(function() {
                return site;
            });
    }
};
