var gulp    = require('gulp');
var gutil   = require('gulp-util');
var nodemon = require('gulp-nodemon');
var paths   = require('../config/gulp').paths;

gulp.task('nodemon', function (cb) {
    var isFirstStart = true;
    return nodemon({ 
        script: './server/app.js', 
        ext: 'js',
        watch: [
            paths.config,
            paths.server
        ],
        env: {
            NODE_ENV: 'development',
            PORT: 5000,
            HOST: 'localhost'
        }
    })
    .on('start', function () {
        gutil.log('Server started!');
        if (isFirstStart) {
            isFirstStart = false;
            cb();
        }
    })
    .on('restart', function () {
        gutil.log('Server restarted!');
    });
}); 
