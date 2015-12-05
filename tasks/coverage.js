'use strict';

var gulp      = require('gulp');
var gistanbul = require('gulp-istanbul');
var gmocha    = require('gulp-mocha');
var config    = require('../config/gulp');
var filters   = require('../config/gulp').filters;
var paths     = require('../config/gulp').paths;

gulp.task('coverage', function(cb) {
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'test';
    }

    gulp.src([
            paths.server + filters.jsDeep,
            '!' + paths.server + 'app.js',
            '!' + paths.server + '/routes/index.js',
        ])
        .pipe(gistanbul())
        .pipe(gistanbul.hookRequire())
        .on('finish', function () {
            gulp.src(paths.test + filters.jsDeep)
                .pipe(gmocha({ reporter: 'dot' }))
                .pipe(gistanbul.writeReports())
                .pipe(gistanbul.enforceThresholds({ thresholds: { global: config.successPercent } }))
                .on('end', cb);
        });
});
