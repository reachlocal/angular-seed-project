/*global module,browser,assert,By,expect,all,q */
module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Given(/^campaign with id "([^"]*)" exists$/, function (campaign_id, callback) {
        callback();
    });

    this.Given('a typical campaign exists', function (callback) {
        callback();
    });

    this.When(/^a user views the campaign id "([^"]*)" dashboard$/, function (campaign_id, callback) {
        browser.get('http://localhost:4000/#campaign/' + campaign_id)
            .then(function() {
                callback();
            });
    });

    this.Then(/^the user should see a campaign header:$/, function (table, callback) {
        var hash = table.hashes()[0];

        var expectPromises = [];
        _.each(hash, function (expectedValue, bindingName) {
            var element = browser.findElement(by.binding('overview.' + bindingName));
            var expectPromise = expect(element.getText()).to.eventually.include(expectedValue);
            expectPromises.push(expectPromise);
        }, this);

        all(expectPromises).then(callback);
    });
};
