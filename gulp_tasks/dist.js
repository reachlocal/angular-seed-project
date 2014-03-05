var lrServer = global.lrServer;

var gulp = require('gulp');
var refresh = require('gulp-livereload');
var config = require('./config/config');
var runSequence = require('run-sequence');

/**
 * Build all minified assets for the 'dist/' directory
 */
gulp.task('dist', function(callback) {
    runSequence('clean',
        'style',
        'js',
        'l10n',
        'dist:copy',
        callback);
});

/**
 * Helper task to copy special files from the application root
 */
gulp.task('dist:copy', function() {
    var copyFiles = [
        config.APPLICATION_ROOT + '/index.html',
        config.APPLICATION_ROOT + '/RlLoader.js'
    ];
    return gulp.src(copyFiles)
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(refresh(lrServer));
});

/**
 * Watch for changes to application files and rebuild 'dist/' directory as needed
 */
gulp.task('dist:watch', [], function () {
    gulp.watch([config.APPLICATION_FILES], ['dist']);
});
