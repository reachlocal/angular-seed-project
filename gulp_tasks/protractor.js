var gulp = require('gulp');
var gutil = require('gulp-util');

/**
 * Static web server AND mock rest web server
 **/
gulp.task('protractor:debug', ['serve'], function() {
    var webDriver = require('./lib/webDriver');
    var runDebugger = function() {
        var child_process = require('child_process');
        var options = ['node_modules/protractor/bin/elementexplorer.js', 'http://localhost:4000/#/campaign/1422307'];
//        var cProcess = child_process.spawn('node', options);
//
//        cProcess.stdout.pipe(process.stdout);
//        cProcess.stderr.pipe(process.stderr);
//        process.stdin.pipe(cProcess.stdin);
        var command = ['node'].concat(options).join(' ');
        gutil.log(gutil.colors.red("Please run this command in another terminal: "), command);
    };
    webDriver.startWebDriver(runDebugger);
});
