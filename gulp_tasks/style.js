var gulp = require('gulp');
var config = require('./config/config');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var bowerFiles = require('gulp-bower-files');
var filter = require('gulp-filter');

gulp.task('style', ['style:vendor'], function () {
    var sassPipe = gulp.src(config.APPLICATION_STYLES)
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(minifyCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
    return sassPipe;
});

gulp.task('style:vendor', function() {
    var bowerCssPipe = bowerFiles()
        .pipe(filter('**/*.css'))
        .pipe(concat('vendor.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
    return bowerCssPipe;
});