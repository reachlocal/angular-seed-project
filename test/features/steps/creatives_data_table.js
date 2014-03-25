/*global module,browser,assert,By,expect,all,q */

var CreativeTable;
function CreativePageObject(browser, by) {

    var q = require('q');
    var table = global.browser.findElement(global.by.tagName("rl-tabular-data"));

    this.dataRows = function() {
        return table.findElements(by.repeater("row in data"));
    };
    this.firstDataRow = function() {
        return this.dataRows()
            .then(function (rows) {
                return rows[0];
            });
    };

    this.headerRow = function() {
        return table.findElement(by.css("thead > tr"));
    };

}

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^the AdGroup is selected in the Global Nav Bar$/, function (callback) {
        // express the regexp above with the code you wish you had
        CreativeTable = new CreativePageObject(browser, by);
        callback();
    });

    this.Then(/^the list of creatives belonging to the selected AdGroup is listed in the data table$/, function (callback) {
        // For now, check that we have 1 or more creatives in the table
        CreativeTable.dataRows()
            .then(function(items) {
                var exp = expect(promiseFor(items.length)).to.eventually.be.above(1);
                all(exp).then(callback);
            });
    });

    this.Then(/^the data table should contain these data elements as columns:$/, function (table, callback) {
        CreativeTable.headerRow().then(function(row) {
            var expectedHeaders = _.pluck(table.hashes(), 'Column Name').join(' ');
            var actualHeaders = row.getText();
            var exp = expect(actualHeaders).to.eventually.equal(expectedHeaders);

            all(exp).then(callback);
        });
    });

    this.Then(/^the data table's first creative has the following values:$/, function(table, callback) {
        CreativeTable.firstDataRow().then(function(row) {
            var exp = [];

            all(exp).then(callback);
        });
    });

};
