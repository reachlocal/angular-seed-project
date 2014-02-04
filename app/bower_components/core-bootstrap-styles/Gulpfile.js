/**
 * These are the tasks for serving, compiling, and testing our client code.
 * Please refer to ./ci/*.js for config options and details about each task.
 */
var gulp = require('gulp');
var config = require('./ci/gulpConfig');

// Live-reload stuff that will be used by multiple consumers
var refresh = require('gulp-livereload');
var lrServer = require('tiny-lr')();

gulp.task('default', ['sass'], function () {});

/**
 * Start a static server that will live-reload when any file is changed.
 **/
gulp.task('serve', ['sass'], function () {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(config.APPLICATION_ROOT, {hidden: true}));
    app.listen(config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);

    gulp.watch(config.APPLICATION_STYLES, ['sass']);
    gulp.watch(config.APPLICATION_VIEWS, function () {
        gulp.src(config.APPLICATION_VIEWS)
            .pipe(refresh(lrServer));
    });
});

gulp.task('sass', function () {
    var sass = require('gulp-sass');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    gulp.src(config.APPLICATION_STYLES)
        .pipe(sass({includePaths: ['./bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap']}))
        .pipe(minifyCss())
        .pipe(concat('core-bootstrap.css'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(refresh(lrServer));
});