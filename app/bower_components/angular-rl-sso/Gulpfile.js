var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var es = require('event-stream');

gulp.task('default', ['test', 'build']);

gulp.task('build', function () {
  return gulp.src('app/rl.sso.scss')
    .pipe(plugins.sass())
    .pipe(plugins.concat('rl.sso.css'))
    .pipe(gulp.dest('app/'));
});

gulp.task('test', function () {
  var karma = require('gulp-karma');
  // Note:  These must be in order:  Bower, project, test
  var projectFiles = [
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-http-auth/src/http-auth-interceptor.js',
    'app/*.js',
    'app/bower_components/angular-mocks/angular-mocks.js',
    'test/**/*.spec.js'
  ];
  var projectFilesSt = gulp.src(projectFiles);

  return es.merge(projectFilesSt)
    .pipe(karma({
      frameworks: ['jasmine'],
      browsers: ['PhantomJS'],
      action: 'run',
      reporters: ['dots', 'junit'],
      singleRun: true
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('TESTS FAILED! DO THE PANIC DANCE!'));
      throw err;
    });
});
