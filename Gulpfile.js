var gulp = require('gulp');

/**
 * ###############################
 * CONFIG
 * Configuration options for our application.
 * ###############################
 */
// When you run the 'serve' task, what port should we use?
var WEB_SERVER_PORT = 4000;
// What is the application's root directory?
var APPLICATION_ROOT = __dirname + '/app';
// When you run the 'serve' task, what port should livereload use?
var LIVERELOAD_PORT = 35729;

/**
 * Matchers for different types of resources
 */
var APPLICATION_SCRIPTS = APPLICATION_ROOT + '/modules/**/*.js';
var APPLICATION_VIEWS = APPLICATION_ROOT + '/modules/**/*.html';
var APPLICATION_STYLES = APPLICATION_ROOT + '/modules/**/*.scss';
// Use this for wathcers that monitor ALL application files
var APPLICATION_FILES = [APPLICATION_SCRIPTS, APPLICATION_VIEWS, APPLICATION_STYLES];

/**
 * Matchers for our bower files - managed by the application developers
 */
var BOWER_FILES = require(APPLICATION_ROOT + '/bower_files').map(function (file) {
    return 'app/' + file;
});

/**
 * Matchers for test libraries (for jasmine-style tests)
 */
var TEST_LIBRARIES = ['app/bower_components/angular-mocks/angular-mocks.js'];

gulp.task('default', function () {});

gulp.task('build_project_file', ['_build_project_file'], function () {
    gulp.src(APPLICATION_SCRIPTS)
        .pipe(refresh(lrServer));
});

/**
 * Automatically rebuild the .project_files.json file
 * Runs async. Resolves the returned promise when file is written.
 * TODO:  Clean this up - it should work on streams, not promises
 * @return promise
 */
gulp.task('_build_project_file', function () {
    var deferred = require('q').defer();
    var glob = require('glob');
    // Search for project files
    glob(APPLICATION_SCRIPTS, {}, function (err, project_files) {
        if (err) {
            deffered.reject('Could not glob-search for project files. ' + err.message);
        } else {
            // Make the file paths relative
            var path = require('path');
            for (var i = 0; i < project_files.length; i++) {
                project_files[i] = path.relative(APPLICATION_ROOT, project_files[i]);
            }

            // Write to file.
            project_files = JSON.stringify(project_files);
            require('fs').writeFile(APPLICATION_ROOT + '/.project_files.json', project_files, function(err) {
                if (err) {
                    deferred.reject('Could not build project files.' + err.message);
                } else {
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
});


/**
 * ###############################
 * SERVER tasks
 * And all things related to tests
 * ###############################
 */
/**
 * Start the live-reload server.
 */
var refresh = require('gulp-livereload');
var lrServer = require('tiny-lr')();

/**
 * Start a static server that will live-reload when any file is changed.
 **/
gulp.task('serve', ['build_project_file'], function () {

    /**
     * Start an express server.
     * Inject the live-reload connector.
     * Configure express to show hidden files.
     */
    function startExpress() {

        var express = require('express');
        var app = express();
        app.use(require('connect-livereload')());
        app.use(express.static(APPLICATION_ROOT, {hidden: true}));
        app.listen(WEB_SERVER_PORT);
    }
    lrServer.listen(LIVERELOAD_PORT);

    startExpress();
    gulp.watch(APPLICATION_FILES, ['build_project_file']);
});


//var runJasmineTests = require('ci/runJasmineTests.js');
/**
 * ###############################
 * TESTS
 * And all things related to tests
 * ###############################
 */
/**
 * Example:  runTests('unit') will run tests in 'test/unit/** /*.spec.js'
 **/
var karmaPort = 9876;
function runJasmineTests (testDirectory) {
    // Note:  These must be in order:  Bower, project, test
    var all_test_files = BOWER_FILES
        .concat(APPLICATION_SCRIPTS)
        .concat(TEST_LIBRARIES)
        .concat(['test/' + testDirectory + '/**/*.spec.js']);

    var karma = require('gulp-karma');
    gulp.src(all_test_files)
        .pipe(karma({
            frameworks: ['jasmine'],
            browsers: ['PhantomJS'],
            action: 'run',
            port: karmaPort++
        }));
}

gulp.task('test:unit', ['build_project_file'], function () {
    runJasmineTests('unit');
});

gulp.task('test:integration', ['build_project_file'], function () {
    runJasmineTests('integration');
});

gulp.task('test', ['test:unit', 'test:integration']);