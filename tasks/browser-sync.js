var gulp        = require('gulp');
var browserSync = require('browser-sync');
var paths       = require('../config/gulp').paths;

gulp.task('browser-sync', ['nodemon'], function() {
    return browserSync({
        notify: true,
        proxy: 'localhost:5000',
        port: 5001,
        open: false,
        reloadDelay: 500,
        files: [
            paths.dist + '**',
            '!' + paths.dist + '**/*.map',
            paths.server + 'views/**/*.html'
        ]
    }); 
});