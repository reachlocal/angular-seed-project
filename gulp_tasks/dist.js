var gulp = require('gulp');
var gutil = require('gulp-util');
var paths = require('./support').paths;
var exec = require('child_process').exec;

var packageName = 'dist.tar.gz';

gulp.task('dist', function () {
  gutil.env.production = true;
  gulp.start('build', tarball);
});

function tarball(error) {
  if (error) return;
  gutil.log('Packaging...');
  exec('tar -zcvf ' + packageName + ' dist', function () {
    gutil.log(packageName + ' is done.');
  });
}