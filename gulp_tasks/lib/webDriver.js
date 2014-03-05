var gutil = require('gulp-util');

/**
 * Start web driver in a child-thread
 */
module.exports = new function() {

    var running = false;

    /**
     * Start the webdriver and call the callback when it's ready for business.
     * @param callback
     */
    this.startWebDriver = function(callback) {
        if (!running) {
            running = true;

            // Update, then run.
            runCommand(['node_modules/.bin/webdriver-manager', 'update', '--standalone'], function() {
                var process = spawnWebDriver();
                gutil.log(gutil.colors.magenta("Waiting for WebDriver to Start..."));
                process.stdout.on('data', function(d) {
                    if (String(d).match('Started SocketListener')) {
                        gutil.log(gutil.colors.cyan("WebDriver is Running!"));
                        callback();
                        callback = function() {}; // Only call it once.
                    }
                });
            });
        }

    };

    // Import the cmd function.
    var runCommand = require('./runCommand');

    function spawnWebDriver() {
        return runCommand(['node_modules/.bin/webdriver-manager', 'start'], function() {
            running = false;
        }, true);
    }

};
