var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');

gulp.task('bower', ['bower:clean'], function (done) {
  bower.commands.install()
    .on('log', log)
    .on('end', function () {
      done();
    });
});

gulp.task('bower:clean', function () {
  var clean = require('gulp-rimraf');
  return gulp.src(bower.config.directory)
    .pipe(clean());
});


function log(event) {
  gutil.log(gutil.colors.cyan(event.id), event.message);
}