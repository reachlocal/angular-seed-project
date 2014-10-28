var gulp = require('gulp');
var gutil = require('gulp-util');
var paths = require('./support').paths;
var runJasmineTestsFunc = require('./lib/runJasmineTests.js');
var configForEnvironment = require('./lib/setConfig');
var seq = require('run-sequence');

gulp.task('test:unit', ['build:javascripts:templates'], function testUnit() {
  return runJasmineTestsFunc();
});

gulp.task('test', function test(done) {
  seq('test:unit', 
    // 'test:cucumber-stub', 
    done);
});

gulp.task('test:watch', ['test:unit'], function testWatch() {
  gulp.watch([paths.spectests, paths.javascripts, paths.statics], ['test:unit']);
});

// Start local server and run protractor tests
function runProtractor(configFile) {
  var connect = require('gulp-connect');
  connect.server({
    root: paths.dist,
    port: 4000
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

// Run cucumber against a local gateway service in stub mode
// (The user must ensure the gateway is running and is in stub mode)
gulp.task('test:cucumber', ['build', 'protractor:webdriver'], function testCucumber() {
  configForEnvironment('localhost');
  return runProtractor('test/features/protractor.config.js');
});
// Run cucumber against ci's gateway service in stub mode
// But using your localhost as the webdriver server (you'll see a browser)
gulp.task('test:cucumber-stub', ['build', 'protractor:webdriver'], function testCucumberStub() {
  configForEnvironment('ci');
  return runProtractor('test/features/protractor.config.js');
});
// Run cucumber against ci's gateway service in stub mode
// using ci's webdriver server (you won't see the browser on your screen)
gulp.task('test:cucumber-ci', ['build'], function testCucumberCi() {
  configForEnvironment('ci');
  return runProtractor('test/features/protractor.ci.config.js');
});

gulp.task('test:fail_on_skipped', function testFailOnSkipped() {
  var shell = require('shelljs');
  var matchDetector = function (exitCode, out) {
    if (exitCode) return;

    var message = 'It looks like you have some tests disabled.';
    gutil.log(gutil.colors.red(message));
    gutil.log(gutil.colors.red(out));
    throw message;
  };
  shell.exec('grep -r ddescribe test', matchDetector);
  shell.exec('grep -r iit test', matchDetector);
});
