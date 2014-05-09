/**
 * Call this in a beforeEach to auto-inject some angular services and prep the
 * helpers class.  (It's not much use without this.)
 * Note:  Make sure you call this after you source your modules or else angular complains.
 * Ex:
 *   beforeEach(module("advertiser.models")); // <-- Include modules first
 *   beforeEach(helpers.beforeEach); // <-- Pass this function to beforeEach()
 */
var httpResolver = {};
httpResolver.beforeEach = function () {
  inject(function ($rootScope, _$httpBackend_) {
    httpResolver.$rootScope = $rootScope;
    httpResolver.$httpBackend = _$httpBackend_;
  });
};

/**
 * Help automate some of the tedium of flushing HTTP requests and resolving promises
 * Call after you trigger an http request.  It will digest the promise object and flush
 * the request.
 */

/**
 * Use this after a call to the http system (or the resource system).
 * This will flush the http request and resolve the outstanding promise.
 * ex:
 *   it('does things', function() {
 *     myModel.query(123); // query the myModel resource
 *     helpers.flush(); // **Resolve the query**
 *     expect($scope.foo).toEqual("bar"); // Verify stuff happened
 *   })
 **/
httpResolver.resolve = function () {
  httpResolver.$rootScope.$digest();
  httpResolver.$httpBackend.flush();
};

/**
 * If you are testing something that uses http, add this as an afterEach to
 * verify all calls are flushed.
 * ex:
 *   afterEach(helpers.afterEach);
 **/
httpResolver.afterEach = function () {
  httpResolver.$httpBackend.verifyNoOutstandingExpectation();
  httpResolver.$httpBackend.verifyNoOutstandingRequest();
};