var gulp = require('gulp');
var config = require('./config/config');
var runSequence = require('run-sequence');

/**
 * Start a static server that will live-reload when any file is changed.
 **/
gulp.task('serve:app', function () {
    runSequence('style', 'l10n', 'serve:dist', 'styleguide');
});

/**
 * Start a basic web server for the dest/ folder - try out your build
 */
gulp.task('serve:dist', ['dist'], function () {
    // Serve app
    var httpServer = require('./lib/httpServer');
    httpServer(config.MINIFY_DESTINATION, config.WEB_SERVER_PORT);
});

/**
 * Static web server AND mock rest web server
 **/
gulp.task('serve', ['serve:app']);
