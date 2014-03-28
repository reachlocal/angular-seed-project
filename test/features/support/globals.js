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
        .then(function () { callback(); })
        .fail(function (results) { callback(results.message); });
    }};
};

module.exports = function () {
    global.Given = global.When = global.Then = this.defineStep;
};