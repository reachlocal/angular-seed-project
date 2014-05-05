var getStagedChanges = function() {
  return browser.findElement(by.css("label[for=staged_changes]"));
};

var getStagedChangesText = exports.getStagedChangesText = function() {
  return getStagedChanges().then(function(stagedChanges) {
    return stagedChanges.getText();
  });
};
