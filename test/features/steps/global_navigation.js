/*global module,browser,assert,By */
module.exports = function() {
    this.World = require('../support/world.js').World;

    this.Given('a typical campaign exists', function(callback) {
        browser.get('http://localhost:4000/#campaign/713896');
        browser.getTitle()
            .then(function(title) {
                assert.equal(title, 'Campaign Overview');
            })
            .then(callback);
    });

    this.When(/^a user filters using All AdGroups$/, function(callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Then(/^the dashboard should be filtered to include all data for the campaign$/, function(callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

};