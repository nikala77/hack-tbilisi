var path        = require('path');

module.exports = function (app, passport) {
    // disable browser back button to return private page after logout
    app.use(function(req, res, next) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    });

    require('./account')(app);
    require('./facebook')(app, passport);
    require('./google')(app, passport);
    require('./dashboard')(app);
    require('./editor')(app);
    require('./embed')(app);

    // authentication strategies
    require('../../config/strategy/passport')(passport);
    require('../../config/strategy/google')(passport);


    app.all('/api/*', function(req, res){
        res.status(404).send('Invalid api url');
    });

    app.get('/', function (req, res) {
        if(req.isAuthenticated()) {
            return res.redirect('/dashboard');
        } else {
            return res.redirect('/login');
        }
    });

    app.use(function(req, res) {
        res.render(path.join(app.get('views'), '404.html'), {
            pageName: 'Bannermaker'
        });
    });

    app.use(function(err, req, res){
        res.render(path.join(app.get('views'), '500.html'), {
            status: err.status || 500,
            error: err
        });
    });
    
    if (process.env.NODE_ENV === 'test') {
        app.use(function(err, req, res, next) {
            console.log('Unexpected error', err, err.stack);
            next();
        });
    }

};