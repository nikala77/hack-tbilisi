var gulp   = require('gulp');
var config = require('../config/gulp').watcher;

gulp.task('watch', function(cb) {
    config.watchers.forEach(function(watcher) {
        gulp.watch(watcher.src, watcher.tasks);
    });
    cb();
});
