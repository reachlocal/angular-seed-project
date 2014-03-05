/**
 * Object for running cucumber tests
 */
module.exports = new function() {

    var runCommand = require('./runCommand');

    this.startCucumber = function() {
        var options = process.argv;
        options.splice(0, 3); // Trim 'gulp' and 'test:cucumber' off param list
        options = ['node_modules/.bin/cucumber-js', './test/features/'].concat(options);

        runCommand(options, function() {});
    };

};