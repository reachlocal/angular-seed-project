var metricsTablePage = require('../page_objects/creatives_data_table');
var newCreativePage  = require('../page_objects/new_creative');

var Q = require('q');

module.exports = function () {
  var context = {};

  When(/^the user has navigated to the Add Creative view$/, function (callback) {
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
        expect(card.isElementPresent(by.model('creative.adGroup'))             ).to.eventually.be.true,
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

  When(/^the user selects an AdGroup in the master creative template$/, function (callback) {
    newCreativePage.chooseMasterAdgroup(0).then(callback);
  });

  Then(/^that AdGroup is selected for all active publisher\-specific creatives$/, function (callback) {
    newCreativePage.publishersSelectedAdgroup().then(function(publishers) {
      var expectationsByPublisher = publishers.map(function(adgroup) {
        return expect(adgroup.getAttribute('value')).to.eventually.equal('0');
      });
      all(expectationsByPublisher).then(callback);
    });
  });

  When(/^the user selects the option to deactivate the publisher\-specific creative$/, function (callback) {
    newCreativePage.deactivateButtonFirstPublisher().then(function(button) {
      button.click().then(callback);
    });
  });

  Then(/^the editable fields in the publisher\-specific creative are disabled$/, function (callback) {
    newCreativePage.firstPublisherFields().then(function(publisher) {
        var exp = [
          expect(publisher.headline.isEnabled()).to.eventually.equal(false),
          expect(publisher.descriptiveLines[0].isEnabled()).to.eventually.equal(false),
          expect(publisher.descriptiveLines[1].isEnabled()).to.eventually.equal(false)
        ];
        all(exp).then(callback);
      });
  });

  Then(/^the option to activate the publisher\-specific creative becomes available$/, function (callback) {
    newCreativePage.activateButtonFirstPublisher().then(function(button) {
      var exp = [
        expect(button.isDisplayed()).to.eventually.equal(true)
      ];

      all(exp).then(callback);
    });
  });

  Then(/^the editable fields are cleared of text$/, function (callback) {
    newCreativePage.firstPublisherFields().then(function(card) {
      var exp = [
        expect(card.headline.getAttribute('value')).to.eventually.equal(''),
        expect(card.descriptiveLines[0].getAttribute('value')).to.eventually.equal(''),
        expect(card.descriptiveLines[1].getAttribute('value')).to.eventually.equal('')
      ];
      all(exp).then(callback);
    });
  });

  When(/^the user selects the option to activate the deactivated publisher\-specific creative$/, function (callback) {
    newCreativePage.activateButtonFirstPublisher().then(function(button) {
      button.click().then(callback);
    });
  });

  Then(/^the headline, descriptive lines, and AdGroup entered in the master template is copied to the newly activated publisher\-specific creative$/, function (callback) {
    newCreativePage.firstPublisherFields().then(function(publisher) {
      var exp = [
        expect(publisher.headline.getAttribute('value')).to.eventually.equal('a headline'),
        expect(publisher.descriptiveLines[0].getAttribute('value')).to.eventually.equal('descriptive line'),
        expect(publisher.descriptiveLines[1].getAttribute('value')).to.eventually.equal('another descriptive line'),
      ];
      all(exp).then(callback);
    });
  });

  Given(/^the view shows multiple publisher\-specific creatives as active$/, function (callback) {
    newCreativePage.activePublishers().then(function(publishers) {
      expect(publishers.length).to.be.above(1);
      callback();
    });
  });

  When(/^the user selects the option to unlink a publisher\-specific creative$/, function (callback) {
    newCreativePage.unlinkButtonFirstPublisher().then(function(button) {
      button.click().then(callback);
    });
  });

  Then(/^the text is not copied into the publisher\-specific fields$/, function (callback) {
    newCreativePage.firstPublisherFields().then(function(publisher) {
      var exp = [
        expect(publisher.headline.getAttribute('value')).to.eventually.not.equal('a headline'),
        expect(publisher.descriptiveLines[0].getAttribute('value')).to.eventually.not.equal('descriptive line'),
        expect(publisher.descriptiveLines[1].getAttribute('value')).to.eventually.not.equal('another descriptive line'),
      ];
      all(exp).then(callback);
    });
  });

  Then(/^there is a visual indicator that shows the publisher specific creative is unlinked$/, function (callback) {
    newCreativePage.linkButtonFirstPublisher().then(function(button) {
      var exp = [
        expect(button.isDisplayed()).to.eventually.equal(true)
      ];
      all(exp).then(callback);
    });
  });

  Given(/^at least one publisher\-specific creative is currently unlinked$/, function (callback) {
    newCreativePage.unlinkButtonFirstPublisher().then(function(button) {
      button.click().then(callback);
    });
  });

  When(/^the user enters different content into the master template fields$/, function (callback) {
    newCreativePage.fillMaster('a new headline', [ 'another descriptive line', 'yet another descriptive line']).then(function() {
      callback();
    });
  });

  When(/^the user selects the option to link a publisher\-specific creative$/, function (callback) {
    newCreativePage.linkButtonFirstPublisher().then(function(button) {
      button.click().then(callback);
    });
  });

  Then(/^the publisher\-specific creative's data attributes are immediately copied from the master creative$/, function (callback) {
    newCreativePage.firstPublisherFields().then(function(publisher) {
      var exp = [
        expect(publisher.headline.getAttribute('value')).to.eventually.equal('a new headline'),
        expect(publisher.descriptiveLines[0].getAttribute('value')).to.eventually.equal('another descriptive line'),
        expect(publisher.descriptiveLines[1].getAttribute('value')).to.eventually.equal('yet another descriptive line'),
      ];
      all(exp).then(callback);
    });
  });

  Then(/^there is a visual indicator that shows the publisher specific creative is linked$/, function (callback) {
    newCreativePage.unlinkButtonFirstPublisher().then(function(button) {
      var exp = [
       expect(button.isDisplayed()).to.eventually.equal(true)
      ];
      all(exp).then(callback);
    });
  });

};
