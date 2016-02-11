var gulp        = require('gulp');
var gplumber    = require('gulp-plumber');
var gsize       = require('gulp-size');
var paths       = require('../config/gulp').paths;
var filters     = require('../config/gulp').filters;

gulp.task('build-theme-css', function() {
    return gulp
        .src(paths.clientCss + filters.cssDeep)
        .pipe(gulp.dest(paths.distCss));
}); 

gulp.task('build-app-img', function() {
    return gulp
        .src(paths.clientImages + filters.imagesDeep)
        .pipe(gplumber())
        .pipe(gsize({
            title: 'app.images'
        }))
        .pipe(gulp.dest(paths.distImages));
});


gulp.task('build-theme-img', ['build-theme-css', 'build-app-img']);
