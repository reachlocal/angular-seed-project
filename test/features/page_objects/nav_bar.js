var getQuickView = function () {
  return browser.findElement(by.css('section#quick_view'));
};

var getQuickViewText = exports.getQuickViewText = function () {
  return getQuickView().then(function (quickView) {
    return quickView.getText();
  });
};

var openQuickView = exports.openQuickView = function () {
  return getStagedChanges().then(function (stagedChanges) {
    return stagedChanges.click();
  });
};

var getStagedChangesText = exports.getStagedChangesText = function () {
  return getStagedChanges().then(function (stagedChanges) {
    return stagedChanges.getText();
  });
};

var getStagedChanges = function () {
  return browser.findElement(by.css('label[for=staged_changes]'));
};

var getReviewChangesLink = exports.getReviewChangesLink = function () {
  return element(by.css('a[rel=staged_changes]'));
};

var openStagedChanges = exports.openStagedChanges = function () {
  return openQuickView().then(function() {
    return getReviewChangesLink().click();
  });
};
