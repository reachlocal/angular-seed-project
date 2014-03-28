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
        browser.findElement(by.css('rl-publisher-filter-nav'))
               .findElement(by.partialLinkText(wpc_name))
               .click()
               .then(function() {
                    callback();
                });
    });

    Then(/^the "([^"]*)" should be listed under "([^"]*)" section$/, function(adgroup_name, wpc_name, callback) {
        browser.findElement(by.xpath("//rl-publisher-menu-item//*[text()='"+ adgroup_name +"']"))
               .getInnerHtml()
               .then(function(value) {
                    expect(value).to.be.equal(adgroup_name);
                    callback();
                });
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
