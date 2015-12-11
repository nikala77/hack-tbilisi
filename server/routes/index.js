var path        = require('path');

module.exports = function (app, passport) {
    require('./account')(app);
    require('./facebook')(app, passport);
    require('./dashboard')(app);
    require('./editor')(app);

    // authentication strategies
    require('../../config/strategy/passport')(passport);

    app.all('/api/*', function(req, res){
        res.status(404).send('Invalid api url');
    });

    app.get('/', function (req, res) {
        res.render(path.join(app.get('views'), 'account/login.html'), {
            pageName: 'hack15'
        });
    });

    app.use(function(req, res) {
        res.render(path.join(app.get('views'), '404.html'), {
            pageName: 'hack15'
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