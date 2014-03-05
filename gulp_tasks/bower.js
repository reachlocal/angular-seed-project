var gulp = require('gulp');
var config = require('./config/config');

/**
 * Remove app/bower_components/
 * Re-install all bower components
 * For things that are 'fuzzy-versioned', this will fetch the latest
 */
gulp.task('bower', ['bower:clean'], function() {
    var bower = require('gulp-bower');
    return bower();
});
gulp.task('bower:clean', function() {
    var clean = require('gulp-clean');
    return gulp.src(config.APPLICATION_ROOT + '/bower_components')
        .pipe(clean());
});