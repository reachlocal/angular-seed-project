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
var bowerFiles = require('gulp-bower-files');
var es = require('event-stream');

var karmaPort = 9876;
module.exports = function (testDirectory) {
  var config = require('../config/config');
  // Note:  These must be in order:  Bower, project, test
  var allTestFiles = [config.APPLICATION_ROOT + '/config.js']
    .concat(config.APPLICATION_SCRIPTS)
    .concat(config.TEST_LIBRARIES)
    .concat(['dist/public/templates.js',
      'test/helpers/**/*.js',
        'test/' + testDirectory + '/**/*.spec.js']);

  var karma = require('gulp-karma');
  return es.merge(bowerFiles(), gulp.src(allTestFiles))
    .pipe(karma({
      frameworks: ['jasmine'],
      browsers: ['PhantomJS'],
      action: 'run',
      reporters: ['dots', 'junit'],
      singleRun: true,
      port: karmaPort++
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('TESTS FAILED! DO THE PANIC DANCE!'));
      throw err;
    });
};
