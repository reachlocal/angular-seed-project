var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
    gulp.src([
        './**/*.js',
        '!./app/bower_components/**/*.js',
        '!./node_modules/**/*.js',
        '!./dist/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});