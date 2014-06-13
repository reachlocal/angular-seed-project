var page = require('../page_objects/creatives_data_table');

module.exports = function () {
  var context = {};

  Given(/^a creative with the visible state of "([^"]*)" is in the data table$/, function (state, callback) {
    this.campaignId = 713896;
    browser.get('/#campaign/' + this.campaignId)
      .then(callback);
  });

  When(/^the user changes the state of the creative to "([^"]*)" in the data table$/, function (newState, callback) {
    page.firstCreativeState().then(function (row) {
      row.click().then(function () {
        callback();
      });
    });
  });

  When(/^a user updates the first creative's headline to "([^"]*)"$/, function (headlineValue, callback) {
    var firstCreative = page.firstCreative();
    page.updateHeadline(firstCreative, headlineValue)
      .then(function () {
        callback();
      });
  });

  When(/^he makes a change to the first creative's headline$/, function (callback) {
    var firstCreative = page.firstCreative();
    page.getHeadlineText(firstCreative).then(function (value) {
      context.currentHeadline = value;
    });
    var newHeadlineText = 'something';

    page.setHeadline(firstCreative, newHeadlineText)
      .then(function () {
        callback();
      });
  });

  When(/^he clicks to cancel those changes$/, function (callback) {
    var firstCreative = page.firstCreative;
    firstCreative().then(function (creative) {
      creative.findElement(by.css('form button[type=\'button\']'))
        .then(function (button) {
          button.click();
          callback();
        });
    });
  });

  Then(/^the creative's state is "([^"]*)"$/, function (expState, callback) {
    page.firstCreativeState().then(function (state) {
      expect(state.getText()).to.eventually.contain(expState)
        .then(function () {
          callback();
        });
    });
  });

  Then(/^the creative reverts to its original state$/, function (callback) {
    var firstCreative = page.firstCreative();
    var firstHeadline = page.getHeadlineText(firstCreative);
    expect(firstHeadline).to.eventually.be.equal(context.currentHeadline)
      .then(function () {
        callback();
      });
  });

  Then(/^the creative's new headline should be "([^"]*)"$/, function (newHeadline, callback) {
    page.firstCreative()
      .then(function (creative) {
        var actualHeadline = creative.findElement(by.binding('headLine')).getText();
        expect(actualHeadline).to.eventually.be.equal(newHeadline)
          .then(function () {
            callback();
          });
      });
  });

  Then(/^the list of creatives belonging to the selected AdGroup is listed in the data table$/, function (callback) {
    // For now, check that we have 1 creative in the table
    page.dataRows()
      .then(function (items) {
        var exp = expect(promiseFor(items.length)).to.eventually.be.equal(1);
        all(exp).then(callback);
      });
  });

  Then(/^the campaign dashboard should show the data table of Creatives under "([^"]*)" across all publishers$/, function (adgroupName, callback) {
    page.dataRowsAdgroups()
      .then(function(rows) {
        var expectationsByCreative = rows.map(function(row) {
          return expect(row.adgroup.getText()).to.eventually.contain(adgroupName);
        });
        all(expectationsByCreative).then(callback);
      });
  });


  Then(/^the campaign dashboard should show the data table of Creatives under "([^"]*)" only for the WPC "([^"]*)"$/, function (adgroupName, publisherName, callback) {
    page.dataRowsAdgroups()
      .then(function(rows) {
        var expectationsByCreative = rows.map(function(row) {
          return [
            expect(row.adgroup.getText()).to.eventually.contain(adgroupName),
            expect(row.publisher.getText()).to.eventually.contain(publisherName)
          ];
        });
        var exp = _.flatten(expectationsByCreative, true);
        all(exp).then(callback);
      });
  });

  Then(/^the data table should contain these data elements as columns:$/, function (table, callback) {
    page.headerRow().then(function (row) {
      var expectedHeaders = _.pluck(table.hashes(), 'Column Name').join(' ');
      var actualHeaders = row.getText();
      var exp = expect(actualHeaders).to.eventually.equal(expectedHeaders);

      all(exp).then(callback);
    });
  });

  Then(/^the first creative is displayed$/, function (table, callback) {
    page.firstCreative().then(function (creative) {
      var exp = table.raw().map(function (tableRow) {
        return expect(creative.getText()).to.eventually.contain(tableRow[0]);
      });
      all(exp).then(callback);
    });
  });

  Then(/^the report data for the first creative is displayed$/, function (table, callback) {
    page.firstDataRow().then(function (row) {
      var exp = table.raw().map(function (tableRow) {
        return expect(row.getText()).to.eventually.contain(tableRow[0]);
      });
      all(exp).then(callback);
    });
  });

};
