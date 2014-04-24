var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('protractor:debug', ['serve'], function() {
  runSelenium(runElementExplorer);
});

var runSelenium = function (callback) {
  require('child_process').exec('node_modules/.bin/webdriver-manager start --chrome').stdout.on('data', function (data) {
    if (data.match(/Started SocketListener/))
      callback();
  });
};

var runElementExplorer = function () {
  commands = ['node_modules/protractor/bin/elementexplorer.js', 'http://localhost:4000/#/campaign/713896'];
  gutil.log(gutil.colors.red("Please run this command in another terminal: "), commands.join(' '));
};
