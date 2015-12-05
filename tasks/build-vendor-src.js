var gulp           = require('gulp');
var gif            = require('gulp-if');
var gsize          = require('gulp-size');
var gconcat        = require('gulp-concat');
var gorder         = require('gulp-order');
var gsourcemaps    = require('gulp-sourcemaps');
var guglify        = require('gulp-uglify');
var gminifyCss     = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var args           = require('../config/gulp').args;
var paths          = require('../config/gulp').paths;
var filters        = require('../config/gulp').filters;

gulp.task('build-vendor-js', function() {
    return gulp
        .src(mainBowerFiles(filters.jsDeep))
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'jquery.js',
            'bootstrap.js',
            'toastr.js',
            'moment.js',
            'lodash.js',
            'angular.js',
            'angular-resource.js',
            'angular-route.js',
            'angular-ui.js',
            'angular-sanitize.js',
            'restangular.js',
            'angular-mocks',
            'ui-bootstrap-tpls.js',
            'select.js',
            'ng-img-crop.js',
            'smart-area.js',
            '*'
        ]))
        .pipe(gif(args.isProduction, guglify({
            mangle: false
        })))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('vendor.js'))
        .pipe(gsize({
            title: 'vendor.js'
        }))
        .pipe(gulp.dest(paths.distJs));
});

gulp.task('build-vendor-css', function() {
    return gulp
        .src(mainBowerFiles(filters.cssDeep))
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'bootstrap.css',
            'font-awesome.css',
            '*'
        ]))
        .pipe(gif(args.isProduction, gminifyCss()))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('vendor.css'))
        .pipe(gsize({
            title: 'vendor.css'
        }))
        .pipe(gulp.dest(paths.distCss));
});

gulp.task('build-vendor-fonts', function() {
    return gulp
        .src(paths.clientFonts + filters.fontsDeep)
        .pipe(gsize({
            title: 'vendor.fonts'
        }))
        .pipe(gulp.dest(paths.distFonts));
});

gulp.task('build-vendor-src', ['build-vendor-js', 'build-vendor-css', 'build-vendor-fonts']);