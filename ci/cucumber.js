/**
 * Object for running cucumber tests
 */
module.exports = new function() {

    var runCommand = require('./runCommand');

    this.startCucumber = function() {
        runCommand(['node_modules/.bin/cucumber-js', './test/features/', '-f', 'pretty'], function() {});
    };

};