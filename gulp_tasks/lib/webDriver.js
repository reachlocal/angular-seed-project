var gutil = require('gulp-util');
var runCommand = require('./runCommand');
var http = require('http');

/**
 * Start web driver in a child-thread
 */
function WebDriver() {

  var running = false;
  var processHandle;

  /**
   * Start the webdriver and call the callback when it's ready for business.
   * @param callback
   */
  this.startWebDriver = function (callback) {
    if (!running) {
      running = true;

      // Update, then run.
      gutil.log(gutil.colors.magenta("Updating Selenium Drivers "), gutil.colors.red("-- this takes a few minutes the first time --"));
      runCommand(['node_modules/.bin/webdriver-manager', 'update', '--standalone'], function () {
        processHandle = spawnWebDriver();
        gutil.log(gutil.colors.magenta("Waiting for WebDriver Server to Start..."));
        processHandle.stdout.on('data', function (d) {
          if (String(d).match('Started SocketListener')) {
            gutil.log(gutil.colors.cyan("WebDriver Server is Running!"));
            callback();
            callback = function () {
            }; // Only call it once.
          }
        });
      });
    }
  };

  /**
   * Stop the webdriver
   * Note:  This will not kill any sessions that are left open.  :(
   */
  this.close = function () {
    if (processHandle.kill) {
      // If you kill the webdriver-manager without sending the kill command to the server
      // It leaves a hanging child process
      http.get('http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer');
      processHandle.kill('SIGKILL');
      gutil.log(gutil.colors.cyan("WebDriver Server Stopped"));
    }
  };

  function spawnWebDriver() {
    return runCommand(['node_modules/.bin/webdriver-manager', 'start'], function () {
      running = false;
    }, true);
  }

}

module.exports = new WebDriver();