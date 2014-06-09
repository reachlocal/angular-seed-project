var isCurrentPage = exports.isCurrentPage = function() {
  return element(by.css('[ui-view=creative-metrics] > table')).isPresent();
};

var creativeMetricsTable = exports.createMetricsTable = function () {
  return browser.findElement(by.css('[ui-view=creative-metrics] > table'));
};

var dataRows = exports.dataRows = function () {
  return creativeMetricsTable().findElements(by.css('tbody > tr'));
};

var headerRow = exports.headerRow = function () {
  return creativeMetricsTable().findElement(by.css('thead > tr'));
};

var openNewCreative = exports.openNewCreative = function() {
  return element(by.css('[rel=new-creative]')).click();
};

var firstDataRow = exports.firstDataRow = function () {
  return dataRows()
    .then(function (rows) {
      return rows[0];
    });
};

var nthDataRow = exports.nthDataRow = function (rowNumber) {
  return dataRows()
    .then(function (rows) {
      return rows[rowNumber];
    });
};

var firstCreative = exports.firstCreative = function () {
  return firstDataRow()
    .then(function (row) {
      return row.findElement(by.css('td:first-of-type'));
    });
};

var firstCreativeState = exports.firstCreativeState = function () {
  return firstDataRow()
    .then(function (row) {
      return row.findElement(by.css('td:nth-of-type(2)'))
        .then(function (cell) {
          return cell.findElement(by.css('.state'));
        });
    });
};

var getHeadline = exports.getHeadline = function (creativePromise) {
  return creativePromise
    .then(function (creative) {
      return creative.findElement(by.binding('headLine'));
    });
};

var getHeadlineText = exports.getHeadlineText = function (creativePromise) {
  return getHeadline(creativePromise)
    .then(function (headline) {
      return headline.getText();
    });
};

var setHeadline = exports.setHeadline = function (creativePromise, value) {
  return creativePromise
    .then(function (creative) {
      getHeadline(creative).then(function (headline) {
        headline.click();
      });
      return creative.findElement(by.css('form input')).then(function (input) {
        input.clear();
        input.sendKeys(value);
        return input;
      });
    });
};

var updateHeadline = exports.updateHeadline = function (creativePromise, value) {
  return setHeadline(creativePromise, value)
    .then(function (element) {
      element.sendKeys('\n');
      return element;
    });
};
