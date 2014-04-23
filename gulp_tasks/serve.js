var gulp = require('gulp');
var paths = require('./support').paths;
var all = require('./support').streams;
var gutil = require('gulp-util');

// Serve =======================================================================

gulp.task('serve', ['build'], function () {
  var connect = require('gulp-connect');

  connect.server({
    livereload : !gutil.env.production,
    root       : paths.dist,
    port       : 4000
  });

  if (!gutil.env.production) {
    var watch = require('gulp-watch');

    gulp.watch(paths.stylesheets, [ 'build:stylesheets' ]);
    gulp.watch(paths.javascripts, [ 'build:javascripts' ]);
    gulp.watch(paths.templates,   [ 'build:javascript:templates' ]);
    gulp.watch(paths.statics,     [ 'build:statics' ]);
    gulp.watch(paths.index,       [ 'build:inject:index' ]);

    gulp.watch([
      paths.styleguide.stylesheets,
      paths.styleguide.index],    [ 'build:styleguide' ]);

    watch({ glob: paths.dist + '/**/*' }).pipe(connect.reload());
  }
});

// Serve Dist ==================================================================

gulp.task('serve:dist', function (done) {
  gutil.env.production = true;
  gulp.start('serve');
});
