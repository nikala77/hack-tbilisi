var _          = require('lodash');
var encryption = require('../util/encryption');

module.exports = function(userSchema) {
    userSchema.methods = {
        // TODO: test it
        comparePassword: function(passwordToMatch) {
            /* jshint camelcase: false */
            return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        },
        // TODO: test it
        hasRole: function(roles) {
            if (_.isString(roles)) {
                roles = [roles];
            }
            return _.intersection(this.currentSiteRoles, roles).length > 0;
        },
        // TODO: test it
        isOwner: function(site) {
            var siteId;
            if (typeof site === 'string') {
                siteId = site;
            } else {
                siteId = site._id.toString();
            }
            return _.any(this.siteRoles, function(siteRoles) {
                return (siteRoles.site.toString() === siteId && siteRoles.roles.indexOf('owner') !== -1);
            });
        },
        // TODO: test it
        syncRoles: function(newRoles) {
            var currentSite = _.find(this.siteRoles, { site: this.currentSite });
            if (currentSite) {
                currentSite.roles = newRoles;
            } else {
                this.siteRoles.push({
                    site: this.currentSite,
                    roles: newRoles
                });
            }
        }
    };

    // TODO: test it
    userSchema.virtual('fullName').get(function() {
        var names = [this.title, this.firstName, this.lastName];
        return names.join(' ');
    });

    // TODO: test it
    userSchema.virtual('currentSiteRoles').get(function() {
        var currentSite = _.find(this.siteRoles, { site: this.currentSite });
        // TODO: check currentSite for null?
        return currentSite.roles;
    });
};
