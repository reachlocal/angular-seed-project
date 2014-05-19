var navBarPage = require('../page_objects/nav_bar');
var stagedChangesPage = require('../page_objects/staged_changes');

module.exports = function () {
  Then(/^the user is presented with a visual indicator that shows that (\d+) changes are staged$/, function (numberOfStagedCreatives, callback) {
    expect(navBarPage.getStagedChangesText()).to.eventually
      .equal(numberOfStagedCreatives + ' Changes Ready To Publish')
      .then(function () {
        callback();
      });
  });

  When(/^the user views the Quick View of staged changes$/, function (callback) {
    navBarPage.openQuickView().then(function () {
      callback();
    });
  });

  When(/^a user views the list of staged changes$/, function (callback) {
    navBarPage.openStagedChanges().then(function () {
      callback();
    });
  });

  Then(/^the user should be presented with (\d+) creative staged changes to review$/, function (numberOfStagedChanges, callback) {
    numberOfStagedChanges = parseInt(numberOfStagedChanges, 10);

    expect(stagedChangesPage.getNumberOfStagedChanges()).to.eventually
      .equal(numberOfStagedChanges)
      .then(function () {
        callback();
      });
  });

  Then(/^the user sees a visual element that shows "([^"]*)"$/, function (message, callback) {
    expect(navBarPage.getQuickViewText()).to.eventually
      .contain(message)
      .then(function () {
        callback();
      });
  });

  Then(/^the user is presented with the option to view the full list of changes$/, function (callback) {
    expect(navBarPage.getReviewChangesLink().isPresent()).to.eventually
      .equal(true)
      .then(function () {
        callback();
      });
  });
};
