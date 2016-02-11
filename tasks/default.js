var gulp = require('gulp');

gulp.task('build', ['build-vendor-src', 'build-theme-img', 'build-banner-src']);
gulp.task('default', ['browser-sync', 'nodemon', 'watch']);
