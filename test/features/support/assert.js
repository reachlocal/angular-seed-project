var webdriver = require('selenium-webdriver');
/**
 * Usage:
 * assert.equal(truePromise, true);
 * assert.callback(callback);
 **/
module.exports = new function() {
  var asserter = require('assert');
  var queueCount = 0;
  var callbacks = [];

  function runCallbacks() {
    if (queueCount === 0) {
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i]();
      }
    }
  }

  this.callback = function(callback) {
    callbacks.push(callback);
    runCallbacks();
  }

  this.equal = function() {
    var args = Array.prototype.slice.call(arguments);
    var promise = args[0];
    if (promise instanceof webdriver.promise.Promise) {
      if (promise instanceof webdriver.WebElement) {
        throw 'expect called with WebElement argment, expected a Promise. ' +
          'Did you mean to use .getText()?';
      }
      queueCount++;
      promise.then(function(data) {
        queueCount--;
        args[0] = data;
        asserter.equal.apply(this, args);
        runCallbacks();
      });
    } else {
      asserter.equal.apply(this, args);
    }
  }

  return this;
};
