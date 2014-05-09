var gulp = require('gulp');
var config = require('./config/config');

var paths = {
  source: config.APPLICATION_ROOT + '/modules/rl_seeds',
  destination: config.APPLICATION_ROOT + '/styleguide',
  dist: config.MINIFY_DESTINATION + '/styleguide'
};

gulp.task('styleguide:index', function () {
  gulp.src(paths.source + '/index.html').pipe(gulp.dest(paths.destination));
});

gulp.task('styleguide', ['styleguide:index'], function () {
  var sass = require('gulp-sass');
  gulp.src(paths.source + '/seeds.scss')
    .pipe(sass({ sourceComments: 'map' }))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('dist:styleguide', ['styleguide'], function () {
  gulp.src(paths.destination + '/**/*').pipe(gulp.dest(paths.dist));
});