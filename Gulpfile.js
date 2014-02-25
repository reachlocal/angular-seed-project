/**
 * These are the tasks for serving, compiling, and testing our client code.
 * Please refer to ./ci/*.js for config options and details about each task.
 */
var gulp = require('gulp');
var config = require('./ci/gulpConfig');
var runSequence = require('run-sequence');

// Live-reload stuff that will be used by multiple consumers
var refresh = require('gulp-livereload');
var lrServer = require('tiny-lr')();

gulp.task('default', ['build']);

gulp.task('dist', function(callback) {
    runSequence('clean',
                'style', 'js', 'l10n',
                'dist:copy',
                callback);
});
gulp.task('dist:copy', function() {
    var copyFiles = [
        config.APPLICATION_ROOT + '/index.html',
        config.APPLICATION_ROOT + '/RlLoader.js'
    ];
    return gulp.src(copyFiles)
        .pipe(gulp.dest(config.MINIFY_DESTINATION))
        .pipe(refresh(lrServer));
});

gulp.task('build', ['dist', 'test']);

gulp.task('dist:watch', [], function () {
    gulp.watch([config.APPLICATION_FILES], ['dist']);
});

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
gulp.task('serve:app', function () {
    runSequence('build_project_file', 'style', 'l10n', 'serve:app:nocompile');
});
gulp.task('serve:app:nocompile', function () {
    // Serve app
    var httpServer = require('./ci/httpServer');
    httpServer(config.APPLICATION_ROOT, config.WEB_SERVER_PORT);
    console.log("Web server running on: http://localhost:" + config.WEB_SERVER_PORT);
    lrServer.listen(config.LIVERELOAD_PORT);

    // Set watchers to trigger live reload
    gulp.watch(config.APPLICATION_SCRIPTS, ['build_project_file']);
    gulp.watch(config.APPLICATION_STYLES, ['style']);
    var rootFiles = [
        config.APPLICATION_ROOT + '/*.html',
        config.APPLICATION_ROOT + '/modules/**/*.html',
        config.APPLICATION_ROOT + '/*.js'
    ];
    gulp.watch(config.APPLICATION_ROOT + '/modules/**/lang-*.json', ['l10n']);
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
gulp.task('test:unit', ['build_project_file', 'ngTemplates', 'l10n:testify'], function () {
    return runJasmineTestsFunc('unit');
});

gulp.task('test:integration', ['build_project_file', 'ngTemplates', 'l10n:testify'], function () {
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
gulp.task('test:cucumber', ['serve:app'], function() {
    // Ensure rest server is running on localhost
    var portscanner = require('portscanner');
    portscanner.checkPortStatus(config.REST_SERVER_PORT, '127.0.0.1', function(error, status) {
        if (status === 'open') {
            // Start web-driver and cucumber
            var webDriver = require('./ci/webDriver');
            var cucumber = require('./ci/cucumber');
            webDriver.startWebDriver(cucumber.startCucumber);
        } else {
            console.error('Cannot run tests. Gateway must be running at port 8001');
            process.exit(1);
        }
    });
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');
    gulp.src([
         './**/*.js',
         '!./app/bower_components/**/*.js',
         '!./node_modules/**/*.js',
         '!./dist/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
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

// Concat translation files
gulp.task('l10n', ['l10n:support'], function () {
    var eventStream = require('event-stream');
    var concatJson = require('./ci/concatJson');

    // Create all the streams for our supported locales
    var jsonStreams = [];
    for (var i in config.LOCALES) {
        var locale = config.LOCALES[i];
        var l10nPipe = gulp.src(config.APPLICATION_ROOT + '/modules/**/lang-' + locale + '.json')
            .pipe(concatJson('lang-' + locale + '.json'))
            .pipe(gulp.dest(config.APPLICATION_ROOT + '/.l10n/'))
            .pipe(gulp.dest(config.MINIFY_DESTINATION + '/.l10n/'))
            .pipe(refresh(lrServer));
        jsonStreams.push(l10nPipe);
    }

    // Group them and return them
    return eventStream.concat.apply(this, jsonStreams);
});

// Copy supporting, lazy-loaded files for l10n
gulp.task('l10n:support', function () {
    var supportFiles = [
        config.APPLICATION_ROOT + '/bower_components/angular-i18n/*.js'
    ]
    return gulp.src(supportFiles)
        .pipe(gulp.dest(config.MINIFY_DESTINATION + '/bower_components/angular-i18n'));
});

// Setup test stubs for translations
gulp.task('l10n:testify', ['l10n'], function () {
    var deferred = require('q').defer();
    var fs = require('fs');
    fs.readFile(config.APPLICATION_ROOT + '/.l10n/lang-en.json', function(err, data) {
        if (err) {
            console.log("Could not build test l10n files.");
            deferred.reject();
            throw err;
        } else {
            data = "// This file is generated automatically by the gulp l10n:testify task.\n" +
                "// Do not edit it.\n" +
                'var translations = ' + data + ';';
            fs.writeFile('test/helpers/l10n.js', data, function () {
                if (err) {
                    console.log("Could not write test l10n file.");
                    deferred.reject();
                    throw err;
                } else {
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
});