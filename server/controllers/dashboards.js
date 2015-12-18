var _              = require('lodash');
var jwt            = require('jwt-simple');
var config         = require('../../config/environment');
var httpUtil       = require('../util/httpUtil');
var mongoose       = require('mongoose');
var errorUtil      = require('../util/errorUtil');
var Users          = require('mongoose').model('user');


exports.getDashboard = function(req, res, next) {
    var userToken = req.headers.authorization.split(' ')[1];
    var payload   = jwt.decode(userToken, config.TOKEN_SECRET);
   
    var _id = payload.sub._id;
    var siteID = mongoose.Types.ObjectId(payload.sub.currentSite);
    var name = req.query.name;

    return Users
        .findOne({
            '_id': _id
        }).execAsync()
        .then(function(user) {
            var sites = user.siteRoles;
            var dashboards = _.find(sites, 'site', siteID).dashboards;
            if(!dashboards.length) {
                return res.send('');
            } else {
                var dashboard = _.find(dashboards, 'name', name);
                return res.json(dashboard);
            }
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.getDashboards = function(req, res, next) {

    var userToken = req.headers.authorization.split(' ')[1];
    var payload   = jwt.decode(userToken, config.TOKEN_SECRET);
   
    var _id = mongoose.Types.ObjectId(payload.sub._id);
    var siteID = mongoose.Types.ObjectId(payload.sub.currentSite);

    return Users
        .findOne({
            '_id': _id
        }).execAsync()
        .then(function(user) {
            var sites = user.siteRoles;
            var dashboards = _.find(sites, 'site', siteID).dashboards;

            return res.json(dashboards);
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });

};

exports.createDashboard = function(req, res, next) {
    var userToken = req.headers.authorization.split(' ')[1];
    var payload   = jwt.decode(userToken, config.TOKEN_SECRET);
   
    var _id = mongoose.Types.ObjectId(payload.sub._id);
    var siteID = mongoose.Types.ObjectId(payload.sub.currentSite);
    var dashboard;

    function parseParams() {
        dashboard = req.body.dashboard;
        return errorUtil.resolve();
    }
    
    function validate() {

        if(!dashboard) {
            return errorUtil.rejectWithObjectNotFoundError('Dashboard is not defined');
        }
        
        if(!dashboard.name || dashboard.name.length > 100) {
            return errorUtil.rejectWithObjectInvalidError('Dashboard is not valid');
        }

        return errorUtil.resolve();
    }

    parseParams()
        .then(validate)
        .then(function() {
            return Users.findOne({ '_id': _id }).execAsync();
        })
        .then(function(User) {
            var sites = User.siteRoles;
            var index = _.findIndex(sites, 'site', siteID);
            var dublicate  = _.findIndex(sites[index].dashboards, 'name', dashboard.name);

            if(dublicate !== -1) {
                return errorUtil.rejectWithDuplicateObjectError('Dashboard with this name already exists');
            } else {
                User.siteRoles[index].dashboards.push(dashboard);
                return User.saveAsync();
            }
        })
        .then(function(User) {
            res.json({ 'message': 'New Dashboard added successfully', '_id': User[0]._id });
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.updateDashboard = function(req, res, next) {
    var userToken = req.headers.authorization.split(' ')[1];
    var payload   = jwt.decode(userToken, config.TOKEN_SECRET);
    
    var _id = mongoose.Types.ObjectId(payload.sub._id);
    var siteID = mongoose.Types.ObjectId(payload.sub.currentSite);
    var zdashboard = req.body.dashboard;

    Users.findOne({
            '_id': _id
        }).execAsync()
        .then(function(user) {
            var siteRoles  = user.siteRoles;
            var dashboards = _.find(siteRoles, 'site', siteID).dashboards;
            var index      = _.findIndex(dashboards,  { 'name': zdashboard.name });

            dashboards[index].theme   = zdashboard.theme;
            // dashboards[index].widgets   = zdashboard.widgets;

            user.siteRoles.dashboards = dashboards;

            return user.saveAsync();
        })
        .then(function() {
            return res.json({ 'message': 'Theme has changed successfully' });      
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};

exports.deleteDashboard = function(req, res, next) {
    var userToken = req.headers.authorization.split(' ')[1];
    var payload   = jwt.decode(userToken, config.TOKEN_SECRET);
   
    var _id = mongoose.Types.ObjectId(payload.sub._id);
    var siteID = mongoose.Types.ObjectId(payload.sub.currentSite);
    var name;

    function parseParams() {
        name = req.query.name;
        return errorUtil.resolve();
    }
    
    function validate() {

        if(!name) {
            return errorUtil.rejectWithObjectNotFoundError('Dashboard name is not defined');
        }

        return errorUtil.resolve();
    }

    parseParams()
        .then(validate)
        .then(function() {
            return Users.findOne({ '_id': _id }).execAsync();
        })
        .then(function(User) {
            var sites = User.siteRoles;
            var dashboards = _.find(sites, 'site', siteID).dashboards;
            
            _.remove(dashboards, { 'name': name });            

            return Users.update({ '_id': _id, 'siteRoles.site': siteID}, 
                { '$set': { 'siteRoles.$.dashboards': dashboards } }).execAsync();
        })
        .then(function() {
            return res.json({ 'message': 'Dashboard removed successfully' });
        })
        .catch(function(err) {
            httpUtil.processError(err, 'json', res, next);
        });
};