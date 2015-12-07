var path    = require('path');
var swig    = require('swig');

module.exports = function (app) {

	require('./account')(app);
    // require('./dashboard')(app);
    require('./editor')(app);

    app.all('/api/*', function(req, res){
        res.status(404).send('Invalid api url');
    });

    app.get('*', function (req, res) {
        res.render(path.join(app.get('views'), 'index.html'), {
            pageName: 'hack15'
        });
    });
    
    if (process.env.NODE_ENV === 'test') {
        app.use(function(err, req, res, next) {
            console.log('Unexpected error', err, err.stack);
            next();
        });
    }

};