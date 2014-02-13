/**
 * ###############################
 * TESTS
 * And all things related to tests
 * ###############################
 */
/**
 * Example:  runTests('unit') will run tests in 'test/unit/** /*.spec.js'
 **/
var gulp = require('gulp');
var karmaPort = 9876;
module.exports = function (testDirectory) {
    var config = require('./gulpConfig');
    // Note:  These must be in order:  Bower, project, test
    var all_test_files = config.BOWER_SCRIPTS
        .concat(config.APPLICATION_SCRIPTS)
        .concat(config.TEST_LIBRARIES)
        .concat(['dist/templates.js',
                 'test/helpers/**/*.js',
                 'test/' + testDirectory + '/**/*.spec.js']);

    var karma = require('gulp-karma');
    return gulp.src(all_test_files)
        .pipe(karma({
            frameworks: ['jasmine'],
            browsers: ['PhantomJS'],
            action: 'run',
            port: karmaPort++
        }));
};
