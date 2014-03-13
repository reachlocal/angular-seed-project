var lrServer = global.lrServer;

var gulp = require('gulp');
var refresh = require('gulp-livereload');
var config = require('./config/config');
var runSequence = require('run-sequence');

/**
 * Start a static server that will live-reload when any file is changed.
 **/
gulp.task('serve:app', function () {
    runSequence('build_project_file', 'style', 'l10n', 'serve:app:nocompile');
});
gulp.task('serve:app:nocompile', function () {
    // Serve app
    var httpServer = require('./lib/httpServer');
    httpServer(config.APPLICATION_ROOT, config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);

    // Set watchers to trigger live reload
    gulp.watch(config.APPLICATION_SCRIPTS, ['build_project_file']);
    gulp.watch(config.APPLICATION_STYLES, ['style']);
    var rootFiles = [
        config.APPLICATION_ROOT + '/*.html',
        config.APPLICATION_ROOT + '/modules/**/*.html',
        config.APPLICATION_ROOT + '/*.js'
    ];
    gulp.watch(config.APPLICATION_ROOT + '/modules/**/lang-*.json', ['l10n']);
    gulp.watch(rootFiles, function() {
        return gulp.src(rootFiles)
            .pipe(refresh(lrServer));
    });
});

/**
 * Start a basic web server for the dest/ folder - try out your build
 */
gulp.task('serve:dist', ['dist'], function () {
    // Serve app
    var httpServer = require('./lib/httpServer');
    httpServer(config.MINIFY_DESTINATION, config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);

    // Set watchers to trigger live reload
    gulp.watch(config.APPLICATION_FILES, ['build']);
});

/**
 * Start a basic rest server that will serve mocks out of the mock directory
 */
gulp.task('serve:rest', function() {
    console.log('[DEPRECATED] Go to the cpi-gateway and run it from there.');
});

/**
 * Static web server AND mock rest web server
 **/
gulp.task('serve', ['serve:app']);
