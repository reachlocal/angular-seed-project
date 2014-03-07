var gulp = require('gulp');
var config = require('./config/config');

/**
 * Minify JS (app and vendor)
 */
gulp.task('js', ['js:app', 'js:vendor']);

/**
 * Minify app js files
 **/
gulp.task('js:app', ['js:app:json', 'js:app:minify']);
/**
 * Minify:app child task - compile templates, minify, and concat.
 */
gulp.task('js:app:minify', ['ngtemplates'], function() {
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    return gulp.src([config.APPLICATION_SCRIPTS, config.MINIFY_DESTINATION + '/templates.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(concat('app.min.js'))
        // TODO: ngmin doesn't like our 'rlmodule' - skip mangling variable names for now...
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});
/**
 * Minify:app child task - build 'dist/' version of .project_scripts.json
 */
gulp.task('js:app:json', ['js:app:minify'], function() {
    var deferred = require('q').defer();
    var glob = require('glob');
    // Write project file.
    var project_files = JSON.stringify(['app.min.js']);
    require('fs').writeFile(config.MINIFY_DESTINATION + '/.project_scripts.json', project_files, function(err) {
        if (err) {
            deferred.reject('Could not build project file.' + err.message);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
});

/**
 * Minify vendor javascript
 */
gulp.task('js:vendor', ['js:vendor:minify', 'js:vendor:json']);
/**
 * Minify:vendor child task - minify and concat
 */
gulp.task('js:vendor:minify', function() {
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    return gulp.src(config.BOWER_SCRIPTS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});
/**
 * Minify:vendor child task - write 'dist/' version of bower_scripts.json
 */
gulp.task('js:vendor:json', ['js:vendor:minify'], function() {
    var fs = require('fs');
    fs.writeFileSync(config.MINIFY_DESTINATION + '/bower_scripts.json', JSON.stringify(['vendor.min.js']));
});