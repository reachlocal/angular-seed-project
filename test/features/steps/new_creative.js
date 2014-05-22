var metricsTablePage = require('../page_objects/creatives_data_table');
var newCreativePage  = require('../page_objects/new_creative');

var Q = require('q');

module.exports = function () {
  var context = {};

  When(/^the user selects the option to add a new creative$/, function (callback) {
    metricsTablePage.openNewCreative().then(callback);
  });

  Then(/^the user is presented with a view to add a new creative in a master template$/, function (callback) {
    callback();
  });

  Then(/^the master template includes a headline, two descriptive lines, and an AdGroup selector$/, function (callback) {
    newCreativePage.masterTemplateCard().then(function(card) {
      var exp = [
        expect(card.isElementPresent(by.model('creative.headLines[0]'))        ).to.eventually.be.true,
        expect(card.isElementPresent(by.model('creative.descriptiveLines[0]')) ).to.eventually.be.true,
        expect(card.isElementPresent(by.model('creative.descriptiveLines[1]')) ).to.eventually.be.true,
      ];
      all(exp).then(callback);
    });
  });

  Then(/^all of the active publishers are displayed to the user$/, function (callback) {
    newCreativePage.publisherTemplateCards().then(function(cards) {
      var expectationsByCard = cards.map(function(card) {
        return [
          expect(card.isElementPresent(by.model('creative.headLines[0]'))        ).to.eventually.be.true,
          expect(card.isElementPresent(by.model('creative.descriptiveLines[0]')) ).to.eventually.be.true,
          expect(card.isElementPresent(by.model('creative.descriptiveLines[1]')) ).to.eventually.be.true,
        ];
      });

      var exp = _.flatten(expectationsByCard, true);
      all(exp).then(callback);

    });
  });

  When(/^the user enters text in the headline and\/or descriptive lines$/, function (callback) {
    newCreativePage.fillMaster('a headline', ['descriptive line','another descriptive line']).then(function() {
      callback();
    });
  });

  Then(/^the text is copied character\-by\-character into the publisher\-specific fields$/, function (callback) {
    newCreativePage.publishersFields().then(function(publishers) {
      var expectationsByPublisher = publishers.map(function(publisher) {
        return [
          expect(publisher.headline.getAttribute('value')).to.eventually.equal('a headline'),
          expect(publisher.descriptiveLines[0].getAttribute('value')).to.eventually.equal('descriptive line'),
          expect(publisher.descriptiveLines[1].getAttribute('value')).to.eventually.equal('another descriptive line'),
        ];
      });
      var exp = _.flatten(expectationsByPublisher, true);
      all(exp).then(callback);
    });
  });

  Then(/^the character counts for each active publisher\-specific creative is updated per character typed$/, function (callback) {
    newCreativePage.publishersRemainingChars().then(function(publishers) {
      var expectationsByPublisher = publishers.map(function(publisher) {
        return [
          expect(publisher.headline.getText()           ).to.eventually.equal('22'),
          expect(publisher.descriptiveLines[0].getText()).to.eventually.equal('44'),
          expect(publisher.descriptiveLines[1].getText()).to.eventually.equal('36'),
        ];
      });
      var exp = _.flatten(expectationsByPublisher, true);
      all(exp).then(callback);
    });
  });
};
