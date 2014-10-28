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
var gutil = require('gulp-util');
var es = require('event-stream');
var support = require('../support');

var karmaPort = 9876;
module.exports = function () {
  var paths = require('../support').paths;
  // Note:  These must be in order:  Bower, project, test

  var allTestFiles = []
    .concat(paths.bowerscripts)
    .concat([paths.app + '/config.js'])
    .concat(paths.javascripts)
    .concat([
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/timekeeper/lib/timekeeper.js',
        'dist/public/templates.js',
        'test/helpers/**/*.js',
        support.paths.spectests]);

  var karma = require('gulp-karma');
  return gulp.src(allTestFiles)
    .pipe(karma({
      frameworks: ['jasmine'],
      browsers: ['PhantomJS'],
      action: 'run',
      reporters: ['dots', 'junit'],
      singleRun: true,
      port: karmaPort++,
      colors: !gutil.env.ci
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('TESTS FAILED! DO THE PANIC DANCE!'));
        throw err;
    });
};
