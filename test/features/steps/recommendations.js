/*global module,browser,assert,By,expect,all,q */
module.exports = function () {
    this.World = require('../support/world.js').World;


    this.Given(/^campaign with id "([^"]*)" exists$/, function (campaign_id, callback) {
        callback();
    });

    this.Given(/^campaign with id "([^"]*)" contains non\-dismissed recommendations$/, function (arg1, callback) {
        // express the regexp above with the code you wish you had
        callback();
    });

    this.Then(/^the list of recommendations is displayed$/, function (callback) {
        browser.findElements(by.repeater('recommendation in recommendations'))
            .then(function(arr) {
                expect(arr.length).to.equal(3);
                callback();
            });

    });

    this.Then(/^the recommendations are sorted by date descending$/, function (callback) {
        // does this belong here?
        callback();
    });

    this.Then(/^the recommendations contain a single line of descriptive text$/, function (callback) {
        browser.findElements(by.repeater('recommendation in recommendations'))
            .then(function (arr) {

                all([
                    expect(arr[0].getText()).to.eventually.include('Add 2 more keywords'),
                    expect(arr[1].getText()).to.eventually.include('Improve the description of the creative'),
                    expect(arr[2].getText()).to.eventually.include('Create more moon wells')
                ]).then(callback);
            });
    });

    this.When(/^a recommendation is selected$/, function (callback) {
        callback.pending();
    });

    this.Then(/^the recommendation section is expanded to include the full details of the recommendation$/, function (callback) {
        callback.pending();
    });
};
