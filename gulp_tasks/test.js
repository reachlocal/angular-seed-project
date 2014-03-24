var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config/config');
var runJasmineTestsFunc = require('./lib/runJasmineTests.js');

gulp.task('test:unit', ['build_project_file', 'ngtemplates', 'l10n:testify'], function () {
    return runJasmineTestsFunc('unit');
});

gulp.task('test:integration', ['build_project_file', 'ngtemplates', 'l10n:testify'], function () {
    return runJasmineTestsFunc('integration');
});

gulp.task('test', ['test:unit', 'test:integration']);

gulp.task('test:watch', ['test:unit', 'test:integration'], function () {
    gulp.watch([config.APPLICATION_FILES, 'test/**/*.spec.js'], ['test:unit', 'test:integration']);
});

/**
 * This runs web driver and cucumber-js
 * Note:  You can pass cucumber-js command line params through with this task
 * ex: gulp test:cucumber --format pretty --tags @CPI-25
 */
gulp.task('test:cucumber', function() {
    var runSequence = require('run-sequence');
    runSequence(
        'build_project_file',
        'ngtemplates',
        'l10n',
        'style',
        'test:cucumber:do'
    );
});

gulp.task('test:cucumber:do', [], function() {
    // Ensure rest server is running on localhost
    var portscanner = require('portscanner');
    portscanner.checkPortStatus(config.REST_SERVER_PORT, '127.0.0.1', function(error, status) {
        if (status === 'open') {
            // Start app server
            var httpServer = require('./lib/httpServer');
            var serverInstance = httpServer(config.APPLICATION_ROOT, config.WEB_SERVER_PORT);

            // Start web-driver and cucumber
            var webDriver = require('./lib/webDriver');
            var cucumber = require('./lib/cucumber');
            cucumber.setCallback(function () {
                serverInstance.close();
                webDriver.close();
                gutil.log(gutil.colors.green('Finised running Cucumber tests.'));
            });
            webDriver.startWebDriver(cucumber.startCucumber);
        } else {
            gutil.log(gutil.colors.red('Cannot run tests. Gateway must be running at port ' + config.REST_SERVER_PORT));
            process.exit(1);
        }
    });
});
