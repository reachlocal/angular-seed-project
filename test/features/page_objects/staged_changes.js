var getNumberOfStagedChanges = exports.getNumberOfStagedChanges = function() {
  return browser.findElements(by.css('table tbody tr')).then(function(elements) {
    return elements.length;
  });
};

var getCounterText = exports.getCounterText = function() {
  return element(by.css('article#staged_changes table caption')).getText();
};

var removeStagedChange = exports.removeStagedChange = function(position) {
  var cssSelector = 'table tbody tr:nth-of-type(' + position + ')';

  browser.actions().mouseMove(element(by.css(cssSelector))).perform();
  return browser.findElement(by.css(cssSelector + ' button')).then(function(element) {
    return element.click();
  });
};

var clickBackButton = exports.clickBackButton = function() {
  return element(by.css('button[rel=back]')).click();
};