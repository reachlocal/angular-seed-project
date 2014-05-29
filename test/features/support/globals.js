var chai = require('chai');
chai.use(require('chai-as-promised'));
global.assert = chai.assert;
global.expect = chai.expect;
global._ = require('underscore');

var Q = require('q');
global.promiseFor = function (value) {
  var deferred = Q.defer();
  deferred.resolve(value);
  return deferred.promise;
};

global.all = function (promiseArray) {
  promiseArray = [].concat(promiseArray);
  var promise = Q.all(promiseArray);

  return { then: function (callback) {
    promise
      .then(function () {
        callback();
      })
      .fail(function (results) {
        callback(results.message);
      });
  }};
};

function withOption(action) {
  return function (selector, item) {
    var selectList, desiredOption;

    selectList = this.findElement(selector);
    selectList.click();

    return selectList.findElements(protractor.By.tagName('option'))
      .then(function findMatchingOption(options) {
        options.some(function (option) {
          option.getText().then(function doesOptionMatch(text) {

            if (item === text) {
              desiredOption = option;
              return true;
            }
          });
        });
      })
      .then(function () {
        return action(desiredOption);
      });
  };
}

module.exports = function () {
  global.Given = global.When = global.Then = this.defineStep;

  var browser = protractor.getInstance();
  browser.selectOption = withOption(function (desiredOption) {
    if (desiredOption) {
      desiredOption.click();
    } else {
      throw new Error('The desired option could not be found');
    }
  }).bind(browser);

  browser.findOption = withOption(function (desiredOption) {
    return !!desiredOption;
  }).bind(browser);
};
