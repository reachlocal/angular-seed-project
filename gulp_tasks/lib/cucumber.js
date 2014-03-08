/**
 * Object for running cucumber tests
 */
var gutil = require('gulp-util');

function Cucumber() {

    var runCommand = require('./runCommand');
    var callback = function () {};

    this.setCallback = function (callbackIn) {
        if (callbackIn && typeof callbackIn === 'function') {
            callback = callbackIn;
        } else {
            var message = "Cucumber callback function is not a function!\n" + typeof callbackIn;
            gutil.log(gutil.colors.red(message));
            throw message;
        }
    };

    this.startCucumber = function () {
        var options = process.argv;
        options.splice(0, 3); // Trim 'gulp' and 'test:cucumber' off param list
        options = ['node_modules/.bin/cucumber-js', './test/features/'].concat(options);

        runCommand(options, callback);
    };

}
module.exports = new Cucumber();