/**
 * These are the tasks for serving, compiling, and testing our client code.
 * Please refer to ./ci/*.js for config options and details about each task.
 */
var gulp = require('gulp');
var config = require('./ci/gulpConfig');

// Live-reload stuff that will be used by multiple consumers
var refresh = require('gulp-livereload');
var lrServer = require('tiny-lr')();

gulp.task('default', ['build']);

gulp.task('dist', ['clean', 'style', 'js'], function() {
    var copyFiles = [
        config.APPLICATION_ROOT + '/index.html',
        config.APPLICATION_ROOT + '/RlLoader.js'
    ];
    return gulp.src(copyFiles)
        .pipe(gulp.dest(config.MINIFY_DESTINATION ))
        .pipe(refresh(lrServer));
});

gulp.task('build', ['dist', 'test']);

gulp.task('dist:watch', [], function () {
    gulp.watch([config.APPLICATION_FILES], ['dist']);
});

/**
 * Automatically rebuild the .project_scripts.json file
 * Runs async. Resolves the returned promise when file is written.
 * @return promise
 */
gulp.task('_build_project_file', function() {
    var buildProjectFileFunc = require('./ci/buildProjectFile');
    return buildProjectFileFunc(config.APPLICATION_SCRIPTS);
});
/**
 * Public version of the above task.  (Use this one.)
 * It notifies live-reload once .project_scripts.json has been rebuilt.
 */
gulp.task('build_project_file', ['_build_project_file'], function () {
    return gulp.src(config.APPLICATION_SCRIPTS)
        .pipe(refresh(lrServer));
});

gulp.task('clean', function () {
    var clean = require('gulp-clean');
    return gulp.src(config.MINIFY_DESTINATION)
        .pipe(clean());
});

/**
 * Start a static server that will live-reload when any file is changed.
 **/
gulp.task('serve:app', ['build_project_file', 'style'], function () {
    // Serve app
    var httpServer = require('./ci/httpServer');
    httpServer(config.APPLICATION_ROOT, config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);

    // Set watchers to trigger live reload
    gulp.watch(config.APPLICATION_SCRIPTS, ['build_project_file']);
    gulp.watch(config.APPLICATION_STYLES, ['style']);
    var rootFiles = [
        config.APPLICATION_ROOT + '/*.html',
        config.APPLICATION_ROOT + '/*.js'
    ];
    gulp.watch(rootFiles, function() {
        return gulp.src(rootFiles)
            .pipe(refresh(lrServer));
    });
});
/**
 * Start a basic web server for the dest/ folder - try out your build
 */
gulp.task('serve:dist', ['build'], function () {
    // Serve app
    var httpServer = require('./ci/httpServer');
    httpServer(config.MINIFY_DESTINATION, config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);

    // Set watchers to trigger live reload
    gulp.watch(config.APPLICATION_FILES, ['build']);
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
gulp.task('test:unit', ['build_project_file', 'ngTemplates'], function () {
    return runJasmineTestsFunc('unit');
});

gulp.task('test:integration', ['build_project_file', 'ngTemplates'], function () {
    return runJasmineTestsFunc('integration');
});

gulp.task('test', ['test:unit', 'test:integration']);

gulp.task('test:watch', ['test:unit', 'test:integration'], function () {
    gulp.watch([config.APPLICATION_FILES, 'test/**/*.spec.js'], ['test:unit', 'test:integration']);
});

/**
 * Run web driver and cucumber-js
 * Note:  You can pass cucumber-js command line params through with this task
 * ex: gulp test:cucumber --format pretty --tags @CPI-25
 */
gulp.task('test:cucumber', ['serve'], function() {
    // Start web-driver and cucumber
    var webDriver = require('./ci/webDriver');
    var cucumber = require('./ci/cucumber');
    webDriver.startWebDriver(cucumber.startCucumber);
});

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
            'app/bower_components/bootstrap-sass/vendor/assets/stylesheets/bootstrap'
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

/**
 * Minify JS (app and vendor)
 */
gulp.task('js', ['js:app', 'js:vendor']);

// Minify app js files
gulp.task('js:app', ['js:app:json', 'js:app:minify']);
gulp.task('js:app:minify', ['ngTemplates'], function() {
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    return gulp.src([config.APPLICATION_SCRIPTS, config.MINIFY_DESTINATION + '/templates.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(concat('app.min.js'))
        // TODO: ngmin doesn't like our 'rlmodule' - skip mangling variable names for now...
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});
gulp.task('js:app:json', ['js:app:minify'], function() {
        var deferred = require('q').defer();
        var glob = require('glob');
        // Write project file.
        var project_files = JSON.stringify(['app.min.js']);
        require('fs').writeFile(config.MINIFY_DESTINATION + '/.project_scripts.json', project_files, function(err) {
            if (err) {
                deferred.reject('Could not build project file.' + err.message);
            } else {
                deferred.resolve();
            }
        });
        return deferred.promise;
});

// Minify vendor files
gulp.task('js:vendor', ['js:vendor:minify', 'js:vendor:json']);
gulp.task('js:vendor:minify', function() {
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    return gulp.src(config.BOWER_SCRIPTS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});
gulp.task('js:vendor:json', ['js:vendor:minify'], function() {
    var fs = require('fs');
    fs.writeFileSync(config.MINIFY_DESTINATION + '/bower_scripts.json', JSON.stringify(['vendor.js']));
});

// Minify templates
gulp.task('ngTemplates', function () {
    var templateCache = require('gulp-angular-templatecache');
    return gulp.src('app/modules/**/*.html')
        .pipe(templateCache({
            root: 'modules',
            module: 'templates'
        }))
        .pipe(gulp.dest(config.MINIFY_DESTINATION));
});
