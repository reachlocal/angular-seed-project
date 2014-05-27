var masterTemplateCard = exports.masterTemplateCard = function() {
  return browser.findElement(by.model('masterCreative'));
};

var publisherTemplateCards = exports.publisherTemplateCards = function() {
  return browser.findElements(by.repeater('publisher in publishers'));
};

var fillMaster = exports.fillMaster = function(headline, descriptiveLines) {
  return masterTemplateCard().then(function(card) {
    var inputs = [
      card.findElement(by.model('creative.headLines[0]'       )).then(function(input) { input.sendKeys(headline);            }),
      card.findElement(by.model('creative.descriptiveLines[0]')).then(function(input) { input.sendKeys(descriptiveLines[0]); }),
      card.findElement(by.model('creative.descriptiveLines[1]')).then(function(input) { input.sendKeys(descriptiveLines[1]); }),
    ];

    return protractor.promise.all(inputs);
  });
};

var chooseMasterAdgroup = exports.chooseMasterAdgroup = function(idx) {
  return masterTemplateCard().then(function(card) {
    return card.findElement(by.css('select option[value="'+idx+'"]')).click();
  });
};

var publishersFields = exports.publishersFields = function() {
  return publisherTemplateCards().then(function(cards) {
    var promises = cards.map(inputsForPublisher);
    return protractor.promise.all(promises);
  });
};

var firstPublisherFields = exports.firstPublisherFields = function() {
  return publishersFields().then(function(publishers) {
    return publishers[0];
  });
};

var publishersRemainingChars = exports.publishersRemainingChars = function() {
  return publisherTemplateCards().then(function(cards) {
    var promises = cards.map(remainingCharsForPublisher);
    return protractor.promise.all(promises);
  });
};

var publishersSelectedAdgroup = exports.publishersSelectedAdgroup = function() {
  return publisherTemplateCards().then(function(cards) {
    var promises = cards.map(selectedAdgroup);
    return protractor.promise.all(promises);
  });
};

var deactivateButtonFirstPublisher = exports.deactivateButtonFirstPublisher = function() {
  return firstPublisherTemplateCard().then(function(card) {
    return card.findElement(by.css('[ng-click^=disable]'));
  });
};
var activateButtonFirstPublisher = exports.activateButtonFirstPublisher = function() {
  return firstPublisherTemplateCard().then(function(card) {
    return card.findElement(by.css('[ng-click^=enable]'));
  });
};

function firstPublisherTemplateCard() {
  return publisherTemplateCards().then(function(cards) {
    return cards[0];
  });
}

function inputsForPublisher(card) {
  var promises = [
    card.findElement(by.model('creative.headLines[0]')),
    card.findElement(by.model('creative.descriptiveLines[0]')),
    card.findElement(by.model('creative.descriptiveLines[1]'))
  ];
  return protractor.promise.all(promises).then(function(inputs) {
    return {
      headline: inputs[0],
      descriptiveLines: [ inputs[1], inputs[2] ]
    };
  });
}

function selectedAdgroup(card) {
  return card.findElement(by.selectedOption('creative.adGroup'));
}

function remainingCharsForPublisher(card) {
  var promises = [
    card.findElement(by.css('.rl-xcounter[for-input="creative.headLines[0]"]'       )),
    card.findElement(by.css('.rl-xcounter[for-input="creative.descriptiveLines[0]"]')),
    card.findElement(by.css('.rl-xcounter[for-input="creative.descriptiveLines[1]"]')),
  ];
  return protractor.promise.all(promises).then(function(remaining) {
    return {
      headline: remaining[0],
      descriptiveLines: [ remaining[1], remaining[2] ]
    };
  });
}



