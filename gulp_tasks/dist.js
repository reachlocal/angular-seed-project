var gulp = require('gulp'),
config = require('./config/config'),
runSequence = require('run-sequence'),
bowerFiles = require('gulp-bower-files'),
es = require('event-stream'),
inject = require('gulp-inject');

gulp.task('dist:config:js', function() {
    var uglify = require('gulp-uglify');

    var copyFiles = [
        config.APPLICATION_ROOT + '/config.js'
    ];
    return gulp.src(copyFiles)
    .pipe(uglify())
    .pipe(gulp.dest(config.MINIFY_DESTINATION));
});

/**
 * Build all minified assets for the 'dist/' directory
 */

gulp.task('dist', function(callback) {
    runSequence('clean', 'style', 'js', 'l10n', 'dist:copy', callback);
});

gulp.task('dist:copy', ['dist:html', 'dist:config:js']);

gulp.task('dist:html', function() {
    var copyFiles = [
        config.APPLICATION_ROOT + '/index.html'
    ];

    gulp.src(copyFiles)
    .pipe(inject(es.merge(
            gulp.src([config.MINIFY_DESTINATION + '/vendor.min.js', config.MINIFY_DESTINATION + '/app.min.js'])
        ), { ignorePath: '/dist' }))
    .pipe(gulp.dest(config.MINIFY_DESTINATION));
});

/**
 * Development routines below - as for dev we do not want to minify stuff
 */

gulp.task('dist:dev', function(callback) {
    runSequence('clean', 'style', 'ngtemplates', 'l10n', 'dist:copy:dev', callback);
});

gulp.task('dist:copy:dev', ['dist:html:dev', 'dist:config:js'], function() {
    bowerFiles()
        .pipe(gulp.dest(config.MINIFY_DESTINATION + '/js'));

    gulp.src('./app/modules/**/*.js')
        .pipe(gulp.dest(config.MINIFY_DESTINATION + '/js/modules'));
});

gulp.task('dist:html:dev', function() {
    var copyFiles = [ config.APPLICATION_ROOT + '/index.html' ];

    gulp.src(copyFiles)
    .pipe(inject(es.merge(
            bowerFiles({read: false }),
            gulp.src('./app/modules/**/*.js', {read: false}),
            gulp.src(config.MINIFY_DESTINATION + '/js/templates.js')
        ), { ignorePath: ['/app', '/bower_components', '/dist/js'], addPrefix: '/js' }))
    .pipe(gulp.dest(config.MINIFY_DESTINATION));
});
