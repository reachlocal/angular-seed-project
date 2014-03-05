var lrServer = global.lrServer;

var gulp = require('gulp');
var config = require('./config/config');
var refresh = require('gulp-livereload');

/**
 * Automatically rebuild the .project_scripts.json file
 * Runs async. Resolves the returned promise when file is written.
 * @return promise
 */
gulp.task('_build_project_file', function() {
    var buildProjectFileFunc = require('./lib/buildProjectFile');
    return buildProjectFileFunc(config.APPLICATION_SCRIPTS);
});
/**
 * Public version of the above task.  (Use this one.)
 * It notifies live-reload once .project_scripts.json has been rebuilt.
 */
gulp.task('build_project_file', ['_build_project_file'], function () {
    return gulp.src(config.APPLICATION_SCRIPTS)
        .pipe(refresh(lrServer));
});