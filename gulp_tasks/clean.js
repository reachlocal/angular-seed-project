var gulp = require('gulp');

/**
 * Delete the minified directory "dist/"
 */
gulp.task('clean', function () {
    var config = require('./config/config');
    var clean = require('gulp-clean');
    return gulp.src(config.MINIFY_DESTINATION)
        .pipe(clean());
});