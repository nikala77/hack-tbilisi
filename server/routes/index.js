var path         = require('path');
// var auth         = require('../controllers/auth');

module.exports = function (app) {

	require('./article')(app);
    require('./user')(app);
    require('./follower')(app);

    // app.get('/refreshJwt', auth.ensureAuthenticated, auth.refreshJwt);

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
    }

};