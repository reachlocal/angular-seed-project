var gulp = require('gulp');
var child = require('child_process');

gulp.task('protractor:webdriver', require('gulp-protractor').webdriver_update); // jshint ignore:line

var selenium, elementExplorer;
gulp.task('protractor:debug', ['protractor:webdriver', 'serve'], function () {
  runSelenium(runElementExplorer);
});

function runSelenium(callback) {
  selenium = child.exec('node_modules/.bin/webdriver-manager start');
  selenium.stderr.on('data', console.error);
  selenium.stdout.on('data', function (data) {
    if (data.match(/started socketlistener/i)) {
      callback();
    }
  });
}

function runElementExplorer() {
  var url = process.env.URL || 'http://localhost:4000/#/1581451';
  elementExplorer = child.spawn('/bin/sh', ['-c', 'node_modules/' +
    'protractor/bin/elementexplorer.js ' + url
  ], { stdio: 'inherit' }).on('exit', process.exit);
}

process.on('exit', function killAll() {
  [selenium, elementExplorer]
    .forEach(function (proc) {
      if (proc) {
        proc.kill();
      }
    });
  child.exec('pkill -9 -f selenium-server-standalone');
});
