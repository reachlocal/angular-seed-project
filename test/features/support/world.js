/*global assert:true,expect:true,expectCallback:true,_:true*/
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var underscore = require('underscore');
chai.use(chaiAsPromised);
var Q = require('q');

var World = (function () {
    function World(callback) {
        // We're going to put some very useful stuff in global scope
        // because it'll be super-helpful
        assert = chai.assert;
        expect = chai.expect;
        _ = underscore;
        q = Q;

        promiseFor = function(value) {
            var deferred = q.defer();
            deferred.resolve(value);
            return deferred.promise;
        };

        // Use this to bundle 'expects' to the cucumberjs callback
        // This will setup a success and failure action for the promises
        // ex: all([expect(...), expect(...)]).then(callback);
        all = function(promiseArray) {
            // If it's not an array, make it an array
            promiseArray = [].concat(promiseArray);
            var promise = Q.all(promiseArray);

            return {
                then: function(callback) {
                    promise
                        // Pass this step
                        .then(function() {
                            callback();
                        })
                        // Fail this step
                        .fail(function(results) {
                            callback(results.message);
                        });
                }
            };
        };

        callback();
    }

    return World;

}());

module.exports.World = World;
