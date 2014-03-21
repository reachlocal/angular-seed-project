var gulp = require('gulp');
var config = require('./config/config');
var refresh = require('gulp-livereload');
var lrServer = global.lrServer;

/**
 * Create minified css file
 */
gulp.task('style', ['style:bower_css']);

gulp.task('style:minify', function () {
    var sass = require('gulp-sass');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');

    var sassPipe = gulp.src(config.APPLICATION_STYLES)
        .pipe(sass({includePaths: [
            'app/bower_components/core-bootstrap-styles/app/sass',
            'app/bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap',
            'app/modules'
        ]}))
        .pipe(minifyCss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(gulp.dest(config.APPLICATION_ROOT))
        .pipe(refresh(lrServer));
    return sassPipe;
});

// Insert a stub-file for bower_css so we don't get 404s.
// TODO: Make it so this file isn't requested from dist in the first place
gulp.task('style:bower_css', ['style:minify'], function() {
    var fs = require('fs');
    fs.writeFileSync(config.MINIFY_DESTINATION + '/bower_css.json', JSON.stringify([]));
});