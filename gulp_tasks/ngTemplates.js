var gulp = require('gulp');
var config = require('./config/config');

/**
 * Minify all html templates and put them in the template cache for angular
 **/
gulp.task('ngtemplates', function () {
    var templateCache = require('gulp-angular-templatecache');
    return gulp.src('app/modules/**/*.html')
        .pipe(templateCache({
            root: 'modules',
            module: 'templates'
        }))
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});