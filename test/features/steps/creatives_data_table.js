var page = require('../page_objects/creatives_data_table');

module.exports = function () {
  When(/^a user updates the first creative's headline to "([^"]*)"$/, function (headline_value, callback) {
    var firstCreative = page.firstCreative;
    page.updateHeadline(firstCreative, headline_value, callback);
  });

  Then(/^the creative's new headline should be "([^"]*)"$/, function (new_headline, callback) {
      page.firstCreative()
          .then(function(creative) {
            var actualHeadline = creative.findElement(by.binding('headLine')).getText();
            expect(actualHeadline).to.eventually.be.equal(new_headline)
                                  .then(function() { callback(); });
          });
  });

  Then(/^the list of creatives belonging to the selected AdGroup is listed in the data table$/, function (callback) {
    // For now, check that we have 1 creative in the table
    page.dataRows()
    .then(function(items) {
      var exp = expect(promiseFor(items.length)).to.eventually.be.equal(1);
      all(exp).then(callback);
    });
  });

  Then(/^the data table should contain these data elements as columns:$/, function (table, callback) {
    page.headerRow().then(function(row) {
      var expectedHeaders = _.pluck(table.hashes(), 'Column Name').join(' ');
      var actualHeaders = row.getText();
      var exp = expect(actualHeaders).to.eventually.equal(expectedHeaders);

      all(exp).then(callback);
    });
  });

  Then(/^the first creative is displayed$/, function(table, callback) {
    page.firstCreative().then(function(creative) {
      var exp = table.raw().map(function(table_row) {
        return expect(creative.getText()).to.eventually.contain(table_row[0]);
      });
      all(exp).then(callback);
    });
  });

  Then(/^the report data for the first creative is displayed$/, function(table, callback) {
    page.firstDataRow().then(function(row) {
      var exp = table.raw().map(function(table_row) {
        return expect(row.getText()).to.eventually.contain(table_row[0]);
      });
      all(exp).then(callback);
    });
  });

};
