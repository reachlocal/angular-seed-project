module.exports = function () {

  Given(/^campaign with id "([^"]*)" exists$/, function (campaignId, callback) {
    callback();
  });

  Given(/^the campaign has the following AdGroups:$/, function (table, callback) {
    callback();
  });

  Given('a typical campaign exists', function (callback) {
    this.campaignId = 1581451;
    callback();
  });

  Given(/^a typical campaign with (\d+) creative staged changes exists$/, function (numberOfCreatives, callback) {
    this.campaignId = 1581451;
    browser.get('/#campaign/' + this.campaignId)
      .then(callback);
  });

  When(/^a user views the campaign id "([^"]*)" dashboard$/, function (campaignId, callback) {
    browser.get('/#campaign/' + campaignId)
      .then(callback);
  });

  When(/^a user is navigating the typical campaign's creative dashboard$/, function (callback) {
    browser.get('/#campaign/' + this.campaignId)
      .then(callback);
  });

  When(/^the user selects the web publisher campaign "([^"]*)"$/, function (wpcName, callback) {
    browser.selectOption(by.name('webPublisherCampaign'), wpcName).then(callback);
  });

  Then(/^the "([^"]*)" should be listed under "([^"]*)" section$/, function (adgroupName, wpcName, callback) {
    browser.findOption(by.name('adGroup'), adgroupName).then(function (found) {
      expect(found).to.equal(true);
      callback();
    });
  });

  When(/^the user selects the ad group "([^"]*)"$/, function (adgroupName, callback) {
    browser.selectOption(by.name('adGroup'), adgroupName).then(callback);
  });

  Then(/^the user should see a campaign header:$/, function (table, callback) {
    var hash = table.hashes()[0];

    var expectPromises = [];
    _.each(hash, function (expectedValue, bindingName) {
      var element = browser.findElement(by.binding('campaign.' + bindingName));
      var expectPromise = expect(element.getText()).to.eventually.include(expectedValue);
      expectPromises.push(expectPromise);
    }, this);

    all(expectPromises).then(callback);
  });

  When(/^the user selects the calendar widget with the intent to select a date range$/, function (callback) {
    browser.findElement(by.model('selectedDateRange')).then(
      function clickCalendar(element) {
        element.click()
          .then(
          function calendarIsDisplayed() {
            expect(element.isDisplayed()).to.eventually.be.true.then(function () {
              callback();
            });
          }
        );
      }
    );
  });

  Then(/^the calendar widget should display the following preselected items:$/, function (table, callback) {
    var hash = table.hashes();
    var expectPromises = [];
    browser.findElements(by.repeater('range in options.ranges'))
      .then(function validateCalendarEntries(elements) {
        // This validates the order, as well as the field names
        // Actual date range selections are validated by unit tests
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var expText = hash[i]['Preset Date Range Text'];
          var expectPromise = expect(element.getText()).to.eventually.include(expText);
          expectPromises.push(expectPromise);
        }
        all(expectPromises).then(callback);
      });
  });

};
