/**
 * These are the tasks for serving, compiling, and testing our client code.
 * Please refer to ./ci/*.js for config options and details about each task.
 */
var gulp = require('gulp');
var config = require('./ci/gulpConfig');

// Live-reload stuff that will be used by multiple consumers
var refresh = require('gulp-livereload');
var lrServer = require('tiny-lr')();

gulp.task('default', ['style']);

gulp.task('bower', ['bower:clean'], function() {
  var bower = require('gulp-bower');
  return bower();
});

gulp.task('bower:clean', function() {
  var clean = require('gulp-clean');
  return gulp.src(config.APPLICATION_ROOT + '/bower_components')
      .pipe(clean());
});

/**
 * Start a static server that will live-reload when any file is changed.
 **/
gulp.task('serve', ['style'], function () {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(config.APPLICATION_ROOT, {hidden: true}));
    app.listen(config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);
    console.log('Server running on: http://localhost:' + config.WEB_SERVER_PORT);

    gulp.watch(config.ALL_STYLES, ['style']);
    gulp.watch(config.APPLICATION_VIEWS, function () {
        gulp.src(config.APPLICATION_VIEWS)
            .pipe(refresh(lrServer));
    });
});

gulp.task('style', ['bower'], function () {
    var sass = require('gulp-sass');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    return gulp.src(config.APPLICATION_STYLES)
        .pipe(sass({includePaths: ['./bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap']}))
        .pipe(minifyCss())
        .pipe(concat('core-bootstrap.css'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(gulp.dest(config.APPLICATION_ROOT))
        .pipe(refresh(lrServer));
});
