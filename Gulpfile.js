/**
 * These are the tasks for serving, compiling, and testing our client code.
 * Please refer to ./ci/*.js for config options and details about each task.
 */
var gulp = require('gulp');
var config = require('./ci/gulpConfig');

// Live-reload stuff that will be used by multiple consumers
var refresh = require('gulp-livereload');
var lrServer = require('tiny-lr')();

gulp.task('default', ['build_project_file', 'sass', 'test'],function () {});

/**
 * Automatically rebuild the .project_files.json file
 * Runs async. Resolves the returned promise when file is written.
 * @return promise
 */
var buildProjectFileFunc = require('./ci/buildProjectFile');
gulp.task('_build_project_file', buildProjectFileFunc);
/**
 * Public version of the above task.  (Use this one.)
 * It notifies live-reload once .project_files.json has been rebuilt.
 */
gulp.task('build_project_file', ['_build_project_file'], function () {
    return gulp.src(config.APPLICATION_SCRIPTS)
        .pipe(refresh(lrServer));
});

gulp.task('clean', function () {
    var clean = require('gulp-clean');
    return gulp.src('dist')
        .pipe(clean());
});

/**
 * Start a static server that will live-reload when any file is changed.
 **/
gulp.task('serve:app', ['build_project_file', 'sass'], function () {
    // Serve app
    var httpServer = require('./ci/httpServer');
    httpServer(config.APPLICATION_ROOT, config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);

    // Set watchers to trigger live reload
    gulp.watch(config.APPLICATION_FILES, ['build_project_file']);
    gulp.watch(config.APPLICATION_STYLES, ['sass']);
    var rootFiles = [
        config.APPLICATION_ROOT + '/*.html',
        config.APPLICATION_ROOT + '/*.html'
    ];
    gulp.watch(rootFiles, function() {
        return gulp.src(rootFiles)
            .pipe(refresh(lrServer));
    });
});

/**
 * Start a basic rest server that will serve mocks out of the mock directory
 */
gulp.task('serve:rest', function() {
    var httpRestServer = require('./ci/httpRestServer');
    httpRestServer();
});

/**
 * Static web server AND mock rest web server
 **/
gulp.task('serve', ['serve:app', 'serve:rest']);

/**
 * Test Tasks
 **/
var runJasmineTestsFunc = require('./ci/runJasmineTests.js');
gulp.task('test:unit', ['build'], function () {
    return runJasmineTestsFunc('unit');
});

gulp.task('test:integration', ['build'], function () {
    return runJasmineTestsFunc('integration');
});

gulp.task('test', ['test:unit', 'test:integration']);

gulp.task('test:watch', ['test:unit', 'test:integration'], function () {
    gulp.watch([config.APPLICATION_FILES, 'test/**/*.spec.js'], ['test:unit', 'test:integration']);
});

gulp.task('test:cucumber', ['serve'], function() {
    // Start web-driver and cucumber
    var webDriver = require('./ci/webDriver');
    var cucumber = require('./ci/cucumber');
    webDriver.startWebDriver(cucumber.startCucumber);
});

// build tasks
gulp.task('build', ['clean', 'build_project_file', 'ngTemplates', 'sass']);

gulp.task('sass', function () {
    var sass = require('gulp-sass');
    var minifyCss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    return gulp.src(config.APPLICATION_STYLES)
        .pipe(sass({includePaths: [
            'app/bower_components/core-bootstrap-styles/app/sass',
            'app/bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap'
        ]}))
        .pipe(minifyCss())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(gulp.dest(config.APPLICATION_ROOT))
        .pipe(refresh(lrServer));
});

gulp.task('ngTemplates', function () {
    var templateCache = require('gulp-angular-templatecache');
    return gulp.src('app/modules/**/*.html')
        .pipe(templateCache({
            root: 'modules',
            module: 'templates'
        }))
        .pipe(gulp.dest('dist'));
});