var gulp  = require('gulp');
require('require-dir')('./gulp_tasks');
gulp.task('default', ['build', 'test', 'lint:failhard', 'githook']);
