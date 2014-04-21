var gulp = require('gulp');
var config = require('./config/config');

gulp.task('serve', ['dist:dev', 'styleguide'], require('gulp-serve')({
    root: config.MINIFY_DESTINATION,
    port: config.WEB_SERVER_PORT
}));

gulp.task('serve:prod', ['dist', 'styleguide'], require('gulp-serve')({
    root: config.MINIFY_DESTINATION,
    port: config.WEB_SERVER_PORT
}));
