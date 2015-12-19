var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var gplumber    = require('gulp-plumber');
var gif         = require('gulp-if');
var gsize       = require('gulp-size');
var gconcat     = require('gulp-concat');
var gsourcemaps = require('gulp-sourcemaps');
var guglify     = require('gulp-uglify');
var gminifyCss  = require('gulp-minify-css');
var gorder      = require('gulp-order');
var gless       = require('gulp-less');
var args        = require('../config/gulp').args;
var paths       = require('../config/gulp').paths;
var filters     = require('../config/gulp').filters;

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
};

/* jshint camelcase: false */
gulp.task('build-banner-js', function() {
    var folders = getFolders(paths.clientBannerJs);

    return folders.map(function(folder) {

        return gulp
            .src(path.join(paths.clientBannerJs, folder, '/**/*.js'))
            .pipe(gorder([
                'svg.js',
                '*'
            ]))
            .pipe(gplumber())
            .pipe(gif(args.isNotProduction, gsourcemaps.init()))
            .pipe(gif(args.isProduction, guglify({ mangle : false })))
            .pipe(gif(args.isNotProduction, gsourcemaps.write()))
            .pipe(gconcat('app.js'))
            .pipe(gsize({
                title: 'app.js'
            }))
            .pipe(gulp.dest(path.join(paths.distBannerJS, folder)));
    });

});

gulp.task('build-banner-css', function() {
    var folders = getFolders(paths.clientBannerCss);

    return folders.map(function(folder) {
        return gulp
            .src(path.join(paths.clientBannerCss, folder, '/**/*.less'))
            .pipe(gplumber())
            .pipe(gif(args.isNotProduction, gsourcemaps.init()))
            .pipe(gless())
            .pipe(gif(args.isProduction, gminifyCss()))
            .pipe(gif(args.isNotProduction, gsourcemaps.write()))
            .pipe(gconcat('app.css'))
            .pipe(gsize({
                title: 'app.css'
            }))
            .pipe(gulp.dest(path.join(paths.distBannerCss, folder)));
    });
});

gulp.task('build-banner-src', ['build-banner-js', 'build-banner-css']);