var gulp        = require('gulp');
var gplumber    = require('gulp-plumber');
var gif         = require('gulp-if');
var gsize       = require('gulp-size');
var gchanged    = require('gulp-changed');
var gcached     = require('gulp-cached');
var gconcat     = require('gulp-concat');
var gremember   = require('gulp-remember');
var gsourcemaps = require('gulp-sourcemaps');
var guglify     = require('gulp-uglify');
var gminifyCss  = require('gulp-minify-css');
var gorder      = require('gulp-order');
var gngAnnotate = require('gulp-ng-annotate');
var gjade       = require('gulp-jade');
var gstylus     = require('gulp-stylus');
var args        = require('../config/gulp').args;
var paths       = require('../config/gulp').paths;
var filters     = require('../config/gulp').filters;

/* jshint camelcase: false */
gulp.task('build-app-js', function() {
    return gulp
        .src(paths.clientJs + filters.jsDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gcached('scripts')))
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'index.js',
            'main.js',
            '*'
        ]))
        .pipe(gngAnnotate({ single_quotes: true }))
        .pipe(gif(args.isProduction, guglify({ mangle : false })))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gif(args.isNotProduction, gremember('scripts')))
        .pipe(gconcat('app.js'))
        .pipe(gsize({
            title: 'app.js'
        }))
        .pipe(gulp.dest(paths.distJs));
});

gulp.task('build-app-css', function() {
    return gulp
        .src(paths.clientCss + filters.lessDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gcached('styles')))
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'site.css',
            '*'
        ]))
        .pipe(gstylus())
        .pipe(gif(args.isProduction, gminifyCss()))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gremember('styles'))
        .pipe(gconcat('app.css'))
        .pipe(gsize({
            title: 'app.css'
        }))
        .pipe(gulp.dest(paths.distCss));
});

gulp.task('build-theme-css', function() {
    return gulp
        .src(paths.clientCss + filters.cssDeep)
        .pipe(gulp.dest(paths.distCss));
}); 

gulp.task('build-app-views', function() {
    return gulp
        .src(paths.clientViews + filters.jadeDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gchanged(paths.distViews, {extension: '.html'})))
        .pipe(gjade())
        .pipe(gsize({
            title: 'app.views'
        }))
        .pipe(gulp.dest(paths.distViews));
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

gulp.task('build-flash-copy-js', function() {
    return gulp
            .src(paths.flashCopy + filters.jsDeep)
            .pipe(gulp.dest(paths.distFlash));
});

gulp.task('build-flash-copy-swf', function() {
    return gulp
            .src(paths.flashCopy + filters.mapDeep)
            .pipe(gulp.dest(paths.distFlash));
});

gulp.task('build-flash-copy-map', function() {
    return gulp
            .src(paths.flashCopy + filters.swfDeep)
            .pipe(gulp.dest(paths.distFlash));
});

gulp.task('build-app-src', ['build-app-js', 'build-app-css', 'build-theme-css', 
    'build-app-views', 'build-app-img', 'build-flash-copy-js', 
    'build-flash-copy-swf', 'build-flash-copy-map']);
