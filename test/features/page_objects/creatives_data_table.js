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

exports.firstCreative = function() {
  return firstDataRow()
    .then(function(row) {
      return row.findElement(by.css("td:first-of-type"));
    });
};
