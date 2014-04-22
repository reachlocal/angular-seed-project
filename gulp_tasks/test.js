var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config/config');
var runJasmineTestsFunc = require('./lib/runJasmineTests.js');


gulp.task('test:unit', ['ngtemplates', 'l10n:testify'], function () {
    return runJasmineTestsFunc('unit');
});

gulp.task('test:integration', ['ngtemplates', 'l10n:testify'], function () {
    return runJasmineTestsFunc('integration');
});

gulp.task('test', ['test:unit', 'test:integration']);

gulp.task('test:watch', ['test:unit', 'test:integration'], function () {
    gulp.watch([config.APPLICATION_FILES, 'test/**/*.spec.js'], ['test:unit', 'test:integration']);
});

gulp.task('test:cucumber:webdriver', require('gulp-protractor').webdriver_update);

gulp.task('test:cucumber', ['test:cucumber:webdriver', 'dist'], function () {
    var serverInstance = require('gulp-serve')({ root: config.MINIFY_DESTINATION,
                                 port: config.WEB_SERVER_PORT });

    var protractor = require('gulp-protractor').protractor;
    gulp.src(['./test/features/*.feature']).pipe(protractor({
        configFile: 'test/features/protractor.config.js'
    }))
        .on('end', function () { serverInstance.close(); })
        .on('error', function (e) { throw e; });
});

gulp.task('test:fail_on_skipped', function() {
    var shell = require('shelljs');
    var matchDetector = function(exitCode, out) {
        if (exitCode) return;

        var message = "It looks like you have some tests disabled.";
        gutil.log(gutil.colors.red(message));
        gutil.log(gutil.colors.red(out));
        throw message;
    };
    shell.exec('grep -r ddescribe test', matchDetector);
    shell.exec('grep -r iit test', matchDetector);
});
