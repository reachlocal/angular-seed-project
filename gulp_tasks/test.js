var gulp = require('gulp');
var gutil = require('gulp-util');
var paths = require('./support').paths;
var runJasmineTestsFunc = require('./lib/runJasmineTests.js');
var seq = require('run-sequence');

gulp.task('test:unit', ['build:javascripts:templates', 'test:helpers:l10n'], function testUnit() {
  return runJasmineTestsFunc('unit');
});

gulp.task('test:integration', ['build:javascripts:templates', 'test:helpers:l10n'], function testIntegration() {
  return runJasmineTestsFunc('integration');
});

gulp.task('test', function test(done) {
  seq('test:unit', 'test:integration', 'test:cucumber-stub', done);
});

gulp.task('test:watch', ['test:unit', 'test:integration'], function testWatch() {
  gulp.watch([paths.spectests, paths.javascripts, paths.statics], ['test:unit', 'test:integration']);
});

// Setup test stubs for translations
gulp.task('test:helpers:l10n', ['build:i18n'], function () {
  var paths = require('./support').paths;
  var deferred = require('q').defer();
  var fs = require('fs');
  fs.readFile(paths.dist + '/l10n/lang-en.json', function (err, data) {
    if (err) {
      gutil.log(gutil.colors.red('Could not build test l10n files.'));
      deferred.reject();
      throw err;
    } else {
      data = '/* jshint quotmark:double */\n' +
        '// This file is generated automatically by the gulp test:helpers:l10n task.\n' +
        '// Do not edit it.\n' +
        'var translations = ' + data + ';';
      fs.writeFile('test/helpers/l10n.js', data, function () {
        if (err) {
          gutil.log(gutil.colors.red('Could not write test l10n file.'));
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

function configForEnvironment(environment) {
  var paths = require('./support').paths;
  var fs = require('fs');
  var sourcePath = 'configs/' + environment + '.js';
  var destPath   = paths.dist + '/config.js';
  fs.unlink(destPath);
  fs.symlinkSync(sourcePath, destPath);
}
// Run cucumber against a local gateway service in stub mode
// (The user must ensure the gateway is running and is in stub mode)
gulp.task('test:cucumber', ['build', 'protractor:webdriver'], function testCucumber() {
  configForEnvironment('development');
  return runProtractor('test/features/protractor.config.js');
});
// Run cucumber against ci's gateway service in stub mode
// But using your localhost as the webdriver server (you'll see a browser)
gulp.task('test:cucumber-stub', ['protractor:webdriver'], function testCucumberStub() {
  configForEnvironment('ci');
  return runProtractor('test/features/protractor.config.js');
});
// Run cucumber against ci's gateway service in stub mode
// using ci's webdriver server (you won't see the browser on your screen)
gulp.task('test:cucumber-ci', function testCucumberCi() {
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
