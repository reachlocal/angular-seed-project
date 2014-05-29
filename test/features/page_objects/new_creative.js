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

var nthPublisherFields = exports.nthPublisherFields = function(position) {
  return nthPublisherTemplateCard(position).then(inputsForPublisher);
};

var nthPublisherSelectedAdgroup = exports.nthPublisherSelectedAdgroup = function(position) {
  return nthPublisherTemplateCard(position).then(function(card) {
    return selectedAdgroup(card);
  });
};

var activePublishers = exports.activePublishers = function() {
  return publisherTemplateCards().then(function(cards) {
    return protractor.promise.filter(cards, function(card) {
      return card.findElement(by.css('[ng-click^=disable]')).isDisplayed();
    });
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

var deactivateButtonNthPublisher = exports.deactivateButtonNthPublisher = function(position) {
  return nthPublisherTemplateCard(position).then(function(card) {
    return card.findElement(by.css('[ng-click^=disable]'));
  });
};

var unlinkButtonNthPublisher = exports.unlinkButtonNthPublisher = function(position) {
  return nthPublisherTemplateCard(position).then(function(card) {
    return card.findElement(by.css('[ng-click^=unlink]'));
  });
};

var activateButtonNthPublisher = exports.activateButtonNthPublisher = function(position) {
  return nthPublisherTemplateCard(position).then(function(card) {
    return card.findElement(by.css('[ng-click^=enable]'));
  });
};

var linkButtonNthPublisher = exports.linkButtonNthPublisher = function(position) {
  return nthPublisherTemplateCard(position).then(function(card) {
    return card.findElement(by.css('[ng-click^=link]'));
  });
};

function nthPublisherTemplateCard(position) {
  var cssSelector = '.creatives article:nth-of-type(' + position + ')';
  return browser.findElement(by.css(cssSelector));
}

function activateButtonForPublisher(card) {
  return card.findElement(by.css('[ng-click=^=enable]'));
}

function deactivateButtonForPublisher(card) {
  return card.findElement(by.css('[ng-click=^=disable]'));
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



