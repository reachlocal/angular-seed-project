module.exports = function () {

  Given(/^campaign with id "([^"]*)" exists$/, function (campaignId, callback) {
    callback();
  });

  Given(/^campaign with id "([^"]*)" contains non\-dismissed recommendations$/, function (arg1, callback) {
    // express the regexp above with the code you wish you had
    callback();
  });

  Then(/^the list of recommendations is displayed$/, function (callback) {
    browser.findElements(by.repeater('recommendation in recommendations'))
      .then(function (arr) {
        expect(arr.length).to.equal(6);
        callback();
      });

  });

  Then(/^the recommendations are sorted by date descending$/, function (callback) {
    // does this belong here?
    callback();
  });

  Then(/^the recommendations contain a single line of descriptive text$/, function (callback) {
    browser.findElements(by.repeater('recommendation in recommendations'))
      .then(function (arr) {

        all([
          expect(arr[0].getText()).to.eventually.include('Add 2 more keywords'),
          expect(arr[1].getText()).to.eventually.include('Improve the description of the creative'),
          expect(arr[2].getText()).to.eventually.include('Create more moon wells')
        ]).then(callback);
      });
  });

  When(/^a recommendation is selected$/, function (callback) {
    browser.findElements(by.repeater('recommendation in recommendations'))
      .then(function (arr) {
        arr[0].click().then(function(e) { callback(); });
      });
  });

  Then(/^the recommendation section is expanded to include the full details of the recommendation$/, function (callback) {
    browser.findElements(by.repeater('recommendation in recommendations'))
      .then(function(arr) {
        arr[0].findElement(by.css('p')).then(function(detail) {
          var exp = [
            expect(detail.isDisplayed()).to.eventually.equal(true)
          ];
          all(exp).then(callback);
        });
      });
  });
};
