var webdriver = require('selenium-webdriver');
/**
 * Usage:
 * assert.equal(truePromise, true);
 * assert.callback(callback);
 **/
var asserts = {};

/**
 * Provide a wrapped version of the assert library with a few handy
 * extensions.  See the assert API for usage details.
 */
asserts.assert = new function () {

    var assert = require('assert');
    var queueCount = 0;
    var callbacks = [];

    /**
     * Run any callbacks functions the user has queued up
     */
    function runCallbacks() {
        if (queueCount === 0) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i]();
            }
        }
    }

    /**
     * Given an assertion function and some arguments
     * Note:  Argument[0] can be a promise, a webdriver element, or a js object
     *        If it's a webdriver element, we'll call getText() automatically
     * @param assertFunc
     * @param arguments
     */
    this.queueAssertion = function (assertFunc, arguments) {
        var args = Array.prototype.slice.call(arguments);
        var promise = args[0];
        var ass = assertFunc;
        if (promise instanceof webdriver.promise.Promise) {
            if (promise instanceof webdriver.WebElement) {
                promise = promise.getText();
            }
            queueCount++;
            promise.then(function (data) {
                queueCount--;
                args[0] = data;
                ass.apply(this, args);
                runCallbacks();
            });
        } else {
            ass.apply(this, args);
        }
    }

    this.callback = function (callback) {
        callbacks.push(callback);
        runCallbacks();
    };

    this.fail = function () {
        this.queueAssertion(assert.fail, arguments);
    };
    this.ok = function () {
        this.queueAssertion(assert.ok, arguments);
    };
    assert.isTruthy = assert.ok;
    this.isTruthy = function () {
        this.queueAssertion(assert.isTruthy, arguments);
    };
    this.isFalsy = function () {
        this.queueAssertion(function (actual, message) {
            if (message) {
                message += "\n";
            }
            message += '"' + actual + '" should be falsy';
            assert.isTruthy(!actual, message);
        }, arguments);
    };
    this.equal = function () {
        this.queueAssertion(assert.equal, arguments);
    };
    /**
     * Assert that the haystack contains the needle
     * Why doesn't node-assert have this built in?  WTF?
     * @param haystack String | Regex  The thing being tested
     * @param needle String
     * @param message String           Optional message to surface upon failure
     */
    this.contains = function () {
        this.queueAssertion(function (haystack, needle, message) {
            if (message) {
                message += "\n";
            }
            message += '"' + haystack + '" contains "' + needle + '"';
            var index = haystack.indexOf(needle);
            assert.isTruthy(index !== -1, message);
        }, arguments);
    }
    this.notEqual = function () {
        this.queueAssertion(assert.notEqual, arguments);
    };
    this.deepEqual = function () {
        this.queueAssertion(assert.deepEqual, arguments);
    };
    this.notDeepEqual = function () {
        this.queueAssertion(assert.notDeepEqual, arguments);
    };
    this.strictEqual = function () {
        this.queueAssertion(assert.strictEqual, arguments);
    };
    this.notStrictEqual = function () {
        this.queueAssertion(assert.notStrictEqual, arguments);
    };
    this.throws = function () {
        this.queueAssertion(assert.throws, arguments);
    };
    this.doesNotThrow = function () {
        this.queueAssertion(assert.doesNotThrow, arguments);
    };
    this.ifError = function () {
        this.queueAssertion(assert.ifError, arguments);
    };

};

/**
 * Provide a jasmine - expect().to__() style API that wraps assert
 * Because I like this style better.  :)
 * Note:  This is a vary partial implementation.  'Cause promises are hard.
 * Example:  asserts.expect(true).toBeTruthy();
 **/
var to = function(actualValue) {

    var actual = actualValue;

    this.toEqual = function(expected, message) {
        asserts.assert.equal(actual, expected, message);
    };
    this.toMatch = function(expected, message) {
        asserts.assert.contains(actual, expected, message);
    };
    // Only supports strings - not arrays
    this.toContain = this.toMatch;
    this.toBeTruthy = function(message) {
        asserts.assert.isTruthy(actual, message);
    };
    this.toBeFalsy = function(message) {
        asserts.assert.isFalsy(actual, message);
    };

}

asserts.expect =  function(actual) {
    return new to(actual);
}
// Alias assert.callback
asserts.expectCallback = asserts.assert.callback;

module.exports = asserts;