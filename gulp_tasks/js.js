var gulp = require('gulp');
var config = require('./config/config');

/**
 * Minify JS (app and vendor)
 */
gulp.task('js', ['js:app', 'js:vendor']);

/**
 * Minify app js files
 **/
gulp.task('js:app', ['js:app:minify']);

/**
 * Minify:app child task - compile templates, minify, and concat.
 */
gulp.task('js:app:minify', ['ngtemplates'], function() {
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    return gulp.src(['app/RlModule.js', config.APPLICATION_SCRIPTS , config.MINIFY_DESTINATION + '/js/templates.js'])
        .pipe(concat('app.min.js', {sourceContent: true }))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});

/**
 * Minify vendor javascript
 */
gulp.task('js:vendor', ['js:vendor:minify']);

/**
 * Minify:vendor child task - minify and concat
 */
gulp.task('js:vendor:minify', function() {
    var uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        bowerFiles = require('gulp-bower-files'),
        es = require('event-stream'),
        exclude = require('gulp-ignore');

    return es.merge(bowerFiles(), gulp.src(config.BOWER_SCRIPTS))
        .pipe(exclude('**/*.css'))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});