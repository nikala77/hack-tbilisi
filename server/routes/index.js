var path         = require('path');
var raygunLogger = require('../util/raygun-logger');
var auth         = require('../controllers/auth');

/* jshint maxstatements: 20 */
module.exports = function (app) {
    app.use(function noCache(req, res, next) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
        next();
    });
    
    //    // Force HTTPS on production
    //    if (app.get('env') === 'production') {
    //        app.use(function (req, res, next) {
    //            var protocol = req.get('x-forwarded-proto');
    //            protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    //        });
    //    }
    
    require('./messages')(app);
    require('./users')(app);
    require('./tokens')(app);
    require('./sites')(app);
    require('./appointments')(app);
    require('./appointmentTemplates')(app);
    require('./clients')(app);
    require('./resources')(app);
    require('./resourceWeekAvTimes')(app);
    require('./patches')(app);
    require('./uploads')(app);
    require('./dashboards')(app);
    
    app.post('/login', auth.login);
    app.get('/refreshJwt', auth.ensureAuthenticated, auth.refreshJwt);

    app.all('/api/*', function(req, res){
        res.status(404).send('Invalid api url');
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(app.get('views'), 'index.html'));
    });
    
    if (process.env.NODE_ENV === 'test') {
        app.use(function(err, req, res, next) {
            console.log('Unexpected error', err, err.stack);
            next();
        });
    } else {
        app.use(raygunLogger.expressHandler);
    }
};
