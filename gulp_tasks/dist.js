var gulp = require('gulp');
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

gulp.task('dist:copy', ['dist:html', 'dist:copy:js']);

/**
 * Helper task to copy special files from the application root
 */
gulp.task('dist:html', function() {
    var copyFiles = [
        config.APPLICATION_ROOT + '/index.html'
    ];
    return gulp.src(copyFiles)
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});

/**
 * Helper task to copy special files from the application root
 * And uglify them...  because OVERKILL IS FUN!  :)
 */
gulp.task('dist:copy:js', function() {
    var uglify = require('gulp-uglify');

    var copyFiles = [
        config.APPLICATION_ROOT + '/config.js'
    ];
    return gulp.src(copyFiles)
        .pipe(uglify())
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});
