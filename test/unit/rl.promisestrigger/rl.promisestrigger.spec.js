describe('rl.promisestrigger', function () {

  var service, dummyListener, listenerDeferred, anotherDummyListener, anotherListenerDeferred, rootScope;

  beforeEach(module('rl.promisestrigger'));
  beforeEach(inject(function ($q, promisestrigger, $rootScope) {
    service = promisestrigger.build();
    dummyListener = function () { listenerDeferred = $q.defer(); return listenerDeferred.promise; };
    anotherDummyListener = function () { anotherListenerDeferred = $q.defer(); return anotherListenerDeferred.promise; };
    rootScope = $rootScope;
  }));

  it('allows a listener to register', function () {
    service.registerListener(dummyListener);

    expect(service.listenerCount()).toBe(1);
  });

  it('notifies the client to create a promise and relieves a promise in return', function () {
    service.registerListener(dummyListener);
    var promise = service.trigger();

    // Verify we got a promise back
    expect(angular.isFunction(promise.then)).toBe(true);
    expect(promise).not.toBe(listenerDeferred);
  });

  describe('when callbacks finish', function () {

    var promise, promiseWasCalled;
    beforeEach(function () {
      service.registerListener(dummyListener);
      service.registerListener(anotherDummyListener);

      promise = service.trigger();
      promiseWasCalled = false;
      promise.then(function () { promiseWasCalled = true; });

      rootScope.$digest();
      expect(promiseWasCalled).toBe(false);
    });

    it('resolves the returned promise when all listeners resolve', function () {
      // Resolve 1 of 2
      listenerDeferred.resolve();
      rootScope.$digest();
      expect(promiseWasCalled).toBe(false);

      // Resolve 2 of 2
      anotherListenerDeferred.resolve();
      rootScope.$digest();
      expect(promiseWasCalled).toBe(true);
    });

    it('does not resolve if callback fails', function () {
      // Resolve 1 of 2
      listenerDeferred.resolve();
      rootScope.$digest();
      expect(promiseWasCalled).toBe(false);

      // Fail 2 of 2
      anotherListenerDeferred.reject();
      rootScope.$digest();
      expect(promiseWasCalled).toBe(false);
    });

  });

});
