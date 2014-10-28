var gulp = require('gulp');
var paths = require('./support').paths;
var all = require('./support').streams;
var gutil = require('gulp-util');
var configForEnvironment = require('./lib/setConfig');

// Serve =======================================================================

gulp.task('_serve', ['build'], function () {
  var connect = require('gulp-connect');

  connect.server({
    livereload: !gutil.env.production,
    root: paths.dist,
    port: 4000
  });

  if (!gutil.env.production) {
    var watch = require('gulp-watch');

    gulp.watch(paths.stylesheets, [ 'build:stylesheets' ]);
    gulp.watch(paths.javascripts, [ 'build:javascripts' ]);
    gulp.watch(paths.templates, [ 'build:javascripts:templates' ]);
    gulp.watch(paths.statics, [ 'build:statics' ]);
    gulp.watch(paths.index, [ 'build:inject:index' ]);
    gulp.watch('app/modules/**/lang-*.json', [ 'build:i18n' ]);

    gulp.watch([
      paths.styleguide.stylesheets,
      paths.styleguide.index], [ 'build:styleguide' ]);

    // watch({ glob: paths.dist + '/**/*' }).pipe(connect.reload());
  }
});

// Build serve tasks for each environment
function serveFor(env) {
  gulp.task('serve:' + env, ['_serve'], function () {
    configForEnvironment(env);
  });
}
serveFor('qa');
serveFor('production');
serveFor('development');
serveFor('ci');

// Run the server as usual - but point at QA's gateway
gulp.task('serve', ['_serve'], function () {
  configForEnvironment('localhost');
});

// Serve Dist ==================================================================

gulp.task('serve:dist', function (done) {
  gutil.env.production = true;
  gulp.start('serve');
});
