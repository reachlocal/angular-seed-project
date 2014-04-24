var creativeMetricsTable = exports.createMetricsTable = function() {
  return browser.findElement(by.css(".creative-metrics > table"));
};

var dataRows = exports.dataRows = function() {
  return creativeMetricsTable().findElements(by.css("tbody > tr"));
};

exports.headerRow = function() {
  return creativeMetricsTable().findElement(by.css("thead > tr"));
};

var firstDataRow = exports.firstDataRow = function() {
  return dataRows()
    .then(function (rows) {
      return rows[0];
    });
};

var firstCreative = exports.firstCreative = function() {
  return firstDataRow()
    .then(function(row) {
      return row.findElement(by.css("td:first-of-type"));
    });
};

exports.updateHeadline = function(creative, value, callback) {
  creative()
    .then(function(creative) {
      creative.findElement(by.binding('headLine')).then(function(headline) { headline.click(); });
      creative.findElement(by.css('form input')).then(function(input) {
        input.clear();
        input.sendKeys(value + '\n');
        callback();
      });
    });
};
