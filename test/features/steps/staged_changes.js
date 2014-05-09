var page = require('../page_objects/nav_bar');

module.exports = function () {
  Then(/^the user is presented with a visual indicator that shows that (\d+) changes are staged$/, function (numberOfStagedCreatives, callback) {
    expect(page.getStagedChangesText()).to.eventually
      .equal(numberOfStagedCreatives + ' Changes Ready To Publish')
      .then(function () {
        callback();
      });
  });

  When(/^the user views the Quick View of staged changes$/, function (callback) {
    page.openQuickView().then(function () {
      callback();
    });
  });

  Then(/^the user sees a visual element that shows "([^"]*)"$/, function (message, callback) {
    expect(page.getQuickViewText()).to.eventually
      .contain(message)
      .then(function () {
        callback();
      });
  });

  Then(/^the user is presented with the option to view the full list of changes$/, function (callback) {
    expect(page.getReviewChangesLink().isPresent()).to.eventually
      .equal(true)
      .then(function () {
        callback();
      });
  });
};
