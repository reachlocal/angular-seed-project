var gulp = require('gulp');
var paths = require('./support').paths;

var paths = {
  source: paths.app + '/modules/rl_seeds',
  destination: paths.app + '/styleguide',
  dist: paths.dist + '/styleguide'
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