/**
 * This file imports and bundles gulp tasks defined in the gulp_tasks directory
 * By convention - tasks defined in this file are only bundles of other tasks
 */
try {
  var gulp = require('gulp');
  var gutil = require('gulp-util');

  // Add a task to render the output
  var taskListing = require('gulp-task-listing');
  gulp.task('help', taskListing.withFilters(null, '_'));

  var seq = require('run-sequence');
  require('require-dir')('./gulp_tasks');

  gulp.task('default', function gulpDefault(done) {
    seq(
      'help',
      'lint:failhard',
      'build',
      'test',
      'test:fail_on_skipped',
      done
    );
  });

  gulp.task('ci', function gulpDefault(done) {
    gutil.env.ci = true;
    var seq = require('run-sequence');
    seq(
      'build',
      'test:fail_on_skipped',
      'lint:failhard',
      'test:unit',
      // 'test:cucumber-ci',
      done
    );
  });
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    console.log('#########################################');
    console.log('You are missing some node modules...');
    console.log('Please run \'npm install\', then try again.');
    console.log('#########################################');
    throw err;
  }
}
