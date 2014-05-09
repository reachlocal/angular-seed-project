var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config/config');
var runJasmineTestsFunc = require('./lib/runJasmineTests.js');
var seq = require('run-sequence');

gulp.task('test:unit', ['build:javascripts:templates', 'l10n:testify'], function testUnit() {
  return runJasmineTestsFunc('unit');
});

gulp.task('test:integration', ['build:javascripts:templates', 'l10n:testify'], function testIntegration() {
  return runJasmineTestsFunc('integration');
});

gulp.task('test', function test(done) {
  seq('test:unit', 'test:integration', 'test:cucumber-stub', done);
});

gulp.task('test:watch', ['test:unit', 'test:integration'], function testWatch() {
  gulp.watch([config.APPLICATION_FILES, 'test/**/*.spec.js'], ['test:unit', 'test:integration']);
});

// Start local server and run protractor tests
function runProtractor(configFile) {
  var connect = require('gulp-connect');
  connect.server({
    root: config.MINIFY_DESTINATION,
    port: config.WEB_SERVER_PORT
  });

  var protractor = require('gulp-protractor').protractor;
  return gulp.src(['./test/features/*.feature'])
    .pipe(protractor({
      configFile: configFile
    }))
    .on('end', function () {
      connect.serverClose();
    })
    .on('error', function (e) {
      throw e;
    });
}
// Write the ci version of the client config.js file to the dist directory
function writeCiClientConfig() {
  return writeClientConfig('./test/features/client.ci.config.js');
}
// Write the localhost version of the client config.js file to the dist directory
function writeLocalClientConfig() {
  return writeClientConfig('./app/config.js');
}
function writeClientConfig(path) {
  var paths = require('./support').paths;
  var concat = require('gulp-concat');
  return gulp.src(path)
    .pipe(concat('config.js'))
    .pipe(gulp.dest(paths.dist));
}
// Run cucumber against a local gateway service in stub mode
// (The user must ensure the gateway is running and is in stub mode)
gulp.task('test:cucumber', ['protractor:webdriver'], function testCucumber() {
  writeLocalClientConfig();
  return runProtractor('test/features/protractor.config.js');
});
// Run cucumber against ci's gateway service in stub mode
// But using your localhost as the webdriver server (you'll see a browser)
gulp.task('test:cucumber-stub', ['protractor:webdriver'], function testCucumberStub() {
  writeCiClientConfig();
  return runProtractor('test/features/protractor.config.js');
});
// Run cucumber against ci's gateway service in stub mode
// using ci's webdriver server (you won't see the browser on your screen)
gulp.task('test:cucumber-ci', function testCucumberCi() {
  writeCiClientConfig();
  return runProtractor('test/features/protractor.ci.config.js');
});

gulp.task('test:fail_on_skipped', function testFailOnSkipped() {
  var shell = require('shelljs');
  var matchDetector = function (exitCode, out) {
    if (exitCode) return;

    var message = "It looks like you have some tests disabled.";
    gutil.log(gutil.colors.red(message));
    gutil.log(gutil.colors.red(out));
    throw message;
  };
  shell.exec('grep -r ddescribe test', matchDetector);
  shell.exec('grep -r iit test', matchDetector);
});
