var getNumberOfStagedChanges = exports.getNumberOfStagedChanges = function() {
  return browser.findElements(by.css('table tbody tr')).then(function(elements) {
    return elements.length;
  });
};
