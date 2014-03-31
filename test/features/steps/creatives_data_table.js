var CreativeTable;
function CreativePageObject(browser, by) {

    var q = require('q');
    var table = global.browser.findElement(global.by.tagName("rl-tabular-data"));

    this.dataRows = function() {
        return table.findElements(by.repeater("row in table"));
    };
    this.firstDataRow = function() {
        return this.dataRows()
            .then(function (rows) {
                return rows[0];
            });
    };
    this.firstCreative = function() {
        return this.firstDataRow()
          .then(function(row) {
            return row.findElement(by.tagName("rl-creative-cell"));
        });
    };

    this.headerRow = function() {
        return table.findElement(by.css("thead > tr"));
    };

}

module.exports = function () {

    When(/^the AdGroup is selected in the Global Nav Bar$/, function (callback) {
        // express the regexp above with the code you wish you had
        CreativeTable = new CreativePageObject(browser, by);
        callback();
    });

    Then(/^the list of creatives belonging to the selected AdGroup is listed in the data table$/, function (callback) {
        // For now, check that we have 1 or more creatives in the table
        CreativeTable.dataRows()
            .then(function(items) {
                var exp = expect(promiseFor(items.length)).to.eventually.be.above(0);
                all(exp).then(callback);
            });
    });

    Then(/^the data table should contain these data elements as columns:$/, function (table, callback) {
        CreativeTable.headerRow().then(function(row) {
            var expectedHeaders = _.pluck(table.hashes(), 'Column Name').join(' ');
            var actualHeaders = row.getText();
            var exp = expect(actualHeaders).to.eventually.equal(expectedHeaders);

            all(exp).then(callback);
        });
    });

    Then(/^the first creative is displayed$/, function(table, callback) {
        CreativeTable.firstCreative().then(function(creative) {
            var exp = table.raw().map(function(table_row) {
                return expect(creative.getText()).to.eventually.contain(table_row[0]);
            });
            all(exp).then(callback);
        });
    });

    Then(/^the report data for the first creative is displayed$/, function(table, callback) {
        CreativeTable.firstDataRow().then(function(row) {
            var exp = table.raw().map(function(table_row) {
                return expect(row.getText()).to.eventually.contain(table_row[0]);
            });
            all(exp).then(callback);
        });
    });

};
