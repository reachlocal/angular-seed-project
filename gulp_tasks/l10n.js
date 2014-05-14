var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config/config');

// Setup test stubs for translations
gulp.task('l10n:testify', ['build:i18n'], function () {
  var deferred = require('q').defer();
  var fs = require('fs');
  fs.readFile(config.MINIFY_DESTINATION + '/.l10n/lang-en.json', function (err, data) {
    if (err) {
      gutil.log(gutil.colors.red('Could not build test l10n files.'));
      deferred.reject();
      throw err;
    } else {
      data = '/* jshint quotmark:double */' +
        '// This file is generated automatically by the gulp l10n:testify task.\n' +
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
