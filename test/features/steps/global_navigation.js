module.exports = function () {

    Given(/^campaign with id "([^"]*)" exists$/, function (campaign_id, callback) {
        callback();
    });

    Given(/^the campaign has the following AdGroups:$/, function (table, callback) {
        callback();
    });

    Given('a typical campaign exists', function (callback) {
        callback();
    });

    When(/^a user views the campaign id "([^"]*)" dashboard$/, function (campaign_id, callback) {
        browser.get('/#campaign/' + campaign_id)
            .then(callback);
    });

    When(/^the user selects the web publisher campaign "([^"]*)"$/, function(wpc_name, callback) {
        browser.selectOption(by.name('webPublisherCampaign'), wpc_name).then(callback);
    });

    Then(/^the "([^"]*)" should be listed under "([^"]*)" section$/, function(adgroup_name, wpc_name, callback) {
        browser.findOption(by.name('adGroup'), adgroup_name).then(function (found) {
            expect(found).to.equal(true);
            callback();
        });
    });

    When(/^the user selects the ad group "([^"]*)"$/, function (ad_group_name, callback) {
        browser.selectOption(by.name('adGroup'), ad_group_name).then(callback);
    });

    Then(/^the user should see a campaign header:$/, function (table, callback) {
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
