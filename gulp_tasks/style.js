var gulp = require('gulp');
var config = require('./config/config');

gulp.task('style', function () {
    var sass = require('gulp-sass');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');

    var sassPipe = gulp.src(config.APPLICATION_STYLES)
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
    return sassPipe;
});
