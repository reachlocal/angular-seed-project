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

gulp.task('dist:copy', ['dist:copy:static', 'dist:copy:js']);
/**
 * Helper task to copy special files from the application root
 */
gulp.task('dist:copy:static', function() {
    var copyFiles = [
        config.APPLICATION_ROOT + '/index.html'
    ];
    return gulp.src(copyFiles)
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(refresh(lrServer));
});
/**
 * Helper task to copy special files from the application root
 * And uglify them...  because OVERKILL IS FUN!  :)
 */
gulp.task('dist:copy:js', function() {
    var uglify = require('gulp-uglify');

    var copyFiles = [
        config.APPLICATION_ROOT + '/RlLoader.js',
        config.APPLICATION_ROOT + '/config.js'
    ];
    return gulp.src(copyFiles)
        .pipe(uglify())
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(refresh(lrServer));
});

/**
 * Watch for changes to application files and rebuild 'dist/' directory as needed
 */
gulp.task('dist:watch', [], function () {
    gulp.watch([config.APPLICATION_FILES], ['dist']);
});
