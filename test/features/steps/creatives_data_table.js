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

// Validate the value against the format
function validateFormat(format) {
    var validators = {
        Number:     function(value) { return !isNaN(parseInt(value)); },
        Float:      function(value) { return !isNaN(parseFloat(value)); },
        Percentage: function(value) {
            var pieces = value.split("%");
            var isPercentage = pieces.length === 2;
            var isFloat = validators.Float(pieces[0]);
            return isPercentage && isFloat;
        },
        String:     function(value) {
            var isNumber     = validators.Number(value);
            var isFloat      = validators.Float(value);
            var isPercentage = validators.Percentage(value);
            var isNumeric    = isNumber || isFloat || isPercentage;
            return !isNumeric;
        }
    };
    return validators[format];
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
        var expects = [];
        var headers = _.pluck(table.hashes(), 'Column Name');

        var headerCheck = CreativeTable.headerRow()
            .then(function(row) {
                var expectedHeaders = _.pluck(table.hashes(), 'Column Name').join(' ');
                var actualHeaders = row.getText();
                expects.push(expect(actualHeaders).to.eventually.equal(expectedHeaders));
            });
        var dataCheck = CreativeTable.firstDataRow()
            .then(function (row) {
                row.findElements(by.tagName('td'))
                    .then(function(cells) {
                        var expectedFormats = _.pluck(table.hashes(), 'Data Type');
                        _.each(expectedFormats, function(format, index) {
                            var validatorFn = validateFormat(format);
                            var message = "Column '" + headers[index] + "' should be a '" + format + "'";
                            expects.push(expect(cells[index].getText()).to.eventually.satisfy(validatorFn));
                        }, this);
                    });
            });

        q.allSettled([headerCheck, dataCheck])
            .fin(function () {
                all(expects).then(callback);
            });

    });

};