var navBarPage = require('../page_objects/nav_bar');
var creativesDataTable = require('../page_objects/creatives_data_table');
var stagedChangesPage = require('../page_objects/staged_changes');

module.exports = function () {
  this.Given(/^the first staged change has a change to its headline$/, function (callback) {
    callback();
  });

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

  When(/^the user cancels the changes for one entity$/, function (callback) {
    stagedChangesPage.removeStagedChange(1).then(function() {
      callback();
    });
  });

  When(/^the user selects the option to publish all staged changes$/, function (callback) {
    stagedChangesPage.publishStagedChanges().then(function() {
      callback();
    });
  });

  Then(/^the user should be presented with (\d+) creative staged changes to review$/, function (numberOfStagedChanges, callback) {
    numberOfStagedChanges = parseInt(numberOfStagedChanges, 10);

    all([
      expect(stagedChangesPage.getNumberOfStagedChanges()).to.eventually.equal(numberOfStagedChanges),
      expect(stagedChangesPage.getCounterText()).to.eventually.contain(numberOfStagedChanges)
    ]).then(callback);
  });

  Then(/^the user is navigated back to the campaign's creative dashboard$/, function (callback) {
    expect(creativesDataTable.isCurrentPage()).to.eventually
      .equal(true)
      .then(function() { callback(); });
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

  Then(/^the user clicks the back button$/, function (callback) {
    stagedChangesPage.clickBackButton().then(function() {
      callback();
    });
  });

  Then(/^the first staged change should have its headline highlighted$/, function (callback) {
    expect(stagedChangesPage.getTotalChangesForCreative(1)).to.eventually
      .equal(1)
      .then(function () {
        callback();
      });
  });
};
