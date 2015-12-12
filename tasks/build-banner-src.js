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

/* jshint camelcase: false */
gulp.task('build-banner-account-js', function() {
    return gulp
        .src(paths.clientAccountJs + filters.jsDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'index.js',
            'main.js',
            '*'
        ]))
        .pipe(gif(args.isProduction, guglify({ mangle : false })))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('app.js'))
        .pipe(gsize({
            title: 'app.js'
        }))
        .pipe(gulp.dest(paths.distAccountJs));
});

gulp.task('build-banner-account-css', function() {
    return gulp
        .src(paths.clientAccountCss + filters.lessDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'site.css',
            '*'
        ]))
        .pipe(gless())
        .pipe(gif(args.isProduction, gminifyCss()))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('app.css'))
        .pipe(gsize({
            title: 'app.css'
        }))
        .pipe(gulp.dest(paths.distAccountCss));
});

gulp.task('build-banner-dashboard-js', function() {
    return gulp
        .src(paths.clientDashboardJs + filters.jsDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'index.js',
            'main.js',
            '*'
        ]))
        .pipe(gif(args.isProduction, guglify({ mangle : false })))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('app.js'))
        .pipe(gsize({
            title: 'app.js'
        }))
        .pipe(gulp.dest(paths.distDashboardJs));
});

gulp.task('build-banner-dashboard-css', function() {
    return gulp
        .src(paths.clientDashboardCss + filters.lessDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'site.css',
            '*'
        ]))
        .pipe(gless())
        .pipe(gif(args.isProduction, gminifyCss()))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('app.css'))
        .pipe(gsize({
            title: 'app.css'
        }))
        .pipe(gulp.dest(paths.distDashboardCss));
});

gulp.task('build-banner-editor-js', function() {
    return gulp
        .src(paths.clientEditorJs + filters.jsDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'index.js',
            'main.js',
            '*'
        ]))
        .pipe(gif(args.isProduction, guglify({ mangle : false })))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('app.js'))
        .pipe(gsize({
            title: 'app.js'
        }))
        .pipe(gulp.dest(paths.distEditorJs));
});

gulp.task('build-banner-editor-css', function() {
    return gulp
        .src(paths.clientEditorCss + filters.lessDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'site.css',
            '*'
        ]))
        .pipe(gless())
        .pipe(gif(args.isProduction, gminifyCss()))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('app.css'))
        .pipe(gsize({
            title: 'app.css'
        }))
        .pipe(gulp.dest(paths.distEditorCss));
});

gulp.task('build-banner-global-js', function() {
    return gulp
        .src(paths.clientGlobalJs + filters.jsDeep)
        .pipe(gplumber())
        .pipe(gif(args.isNotProduction, gsourcemaps.init()))
        .pipe(gorder([
            'index.js',
            'main.js',
            '*'
        ]))
        .pipe(gif(args.isProduction, guglify({ mangle : false })))
        .pipe(gif(args.isNotProduction, gsourcemaps.write()))
        .pipe(gconcat('app.js'))
        .pipe(gsize({
            title: 'app.js'
        }))
        .pipe(gulp.dest(paths.distGlobalJs));
});

// gulp.task('build-banner-global-css', function() {
//     return gulp
//         .src(paths.clientGlobalCss + filters.lessDeep)
//         .pipe(gplumber())
//         .pipe(gif(args.isNotProduction, gsourcemaps.init()))
//         .pipe(gorder([
//             'site.css',
//             '*'
//         ]))
//         .pipe(gless())
//         .pipe(gif(args.isProduction, gminifyCss()))
//         .pipe(gif(args.isNotProduction, gsourcemaps.write()))
//         .pipe(gconcat('app.css'))
//         .pipe(gsize({
//             title: 'app.css'
//         }))
//         .pipe(gulp.dest(paths.distGlobalCss));
// });

gulp.task('build-banner-src', ['build-banner-account-js', 'build-banner-account-css',
'build-banner-dashboard-js', 'build-banner-dashboard-css', 'build-banner-editor-js', 
'build-banner-editor-css', 'build-banner-global-js'
]);