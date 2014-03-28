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

gulp.task('test:cucumber:webdriver', require('gulp-protractor').webdriver_update);

gulp.task('test:cucumber', ['test:cucumber:webdriver'], function () {
    var httpServer = require('./lib/httpServer');
    var serverInstance = httpServer(config.APPLICATION_ROOT, config.WEB_SERVER_PORT);

    var protractor = require('gulp-protractor').protractor;
    gulp.src(['./test/features/*.feature']).pipe(protractor({
        configFile: 'test/features/protractor.config.js'
    }))
        .on('end', function () { serverInstance.close(); })
        .on('error', function (e) { throw e; });
});