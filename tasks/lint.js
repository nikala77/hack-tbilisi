var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var filters = require('../config/gulp').filters;
var paths   = require('../config/gulp').paths;

gulp.task('lint-client', function() {
    return gulp
        .src(paths.clientJs + filters.jsDeep)
        .pipe(jshint(paths.clientJs + '.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-server', function() {
    return gulp
        .src([
            paths.config + filters.jsDeep,
            paths.tasks + filters.jsDeep,
            paths.server + filters.jsDeep
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-test', function() {
    return gulp
        .src(paths.test + filters.jsDeep)
        .pipe(jshint(paths.test + '.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint', ['lint-client', 'lint-server', 'lint-test']);
