var path           = require('path');
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
var rootPath = path.normalize(__dirname);

gulp.task('build-vendor-js', function() {

    var cabinetPath = paths.vendor + 'jquery.cabinet/jquery.cabinet.js';
    var matrixPath = paths.vendor + 'jquery-free-transform/js/Matrix.js';
    var freetransPath = paths.vendor + 'jquery-free-transform/js/jquery.freetrans.js';
    var notMainBowerFiles = [ cabinetPath, freetransPath, matrixPath ];

    return gulp
        .src(mainBowerFiles(filters.jsDeep).concat(notMainBowerFiles))
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'jquery.js',
            'bootstrap.js',
            'toastr.js',
            'moment.js',
            'lodash.js',
            'select.js',
            'jquery-ui.js',
            'jquery.cabinet.js',
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
    var bootstrap = paths.vendor + 'bootstrap/dist/css/' + '*.css';
    var jqueryUICss = paths.vendor + 'jquery-ui/themes/black-tie/css/' + 'jquery-ui.min.css';
    var fontAwesome = paths.vendor + 'font-awesome/css/' + '*.css';
    var colPicker = paths.vendor + 'jquery-colpick/css/' + '*.css';
    var freetrans = paths.vendor + 'jquery-free-transform/css/' + '*.css';
    var array = [bootstrap, jqueryUICss, fontAwesome, colPicker, freetrans];

    return gulp
        .src(array)
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'bootstrap.css',
            'font-awesome.css',
            'jquery-ui.min.css',
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
    var bootstrap = paths.vendor + '/bootstrap/dist/fonts/' + filters.fontsDeep;
    var fontAwesome = paths.vendor + '/font-awesome/fonts/' + filters.fontsDeep;
    var fonts = paths.vendor + '/fonts/' + filters.fontsDeep; 
    var array = [bootstrap, fontAwesome, fonts];

    return gulp
        .src(array)
        .pipe(gulp.dest(paths.distFonts));
});

gulp.task('build-vendor-src', ['build-vendor-js', 'build-vendor-css', 'build-vendor-fonts']);