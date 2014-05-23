describe('rl.promisestrigger', function () {

  var service, q, dummyListener, listenerDeferred, rootScope;

  beforeEach(module('rl.promisestrigger'));
  beforeEach(inject(function ($q, promisestrigger, $rootScope) {
    service = promisestrigger.build();
    q = $q;
    dummyListener = function () { listenerDeferred = q.defer(); return listenerDeferred.promise; };
    rootScope = $rootScope;
  }));

  it('allows a listener to register', function () {
    service.registerListener(dummyListener);

    expect(service.listenerCount()).toBe(1);
  });

  it('notifies the client to create a promise and recieves a promise in return', function () {
    service.registerListener(dummyListener);
    var promise = service.trigger();

    // Verify we got a promise back
    expect(angular.isFunction(promise.then)).toBe(true);
    expect(promise).not.toBe(listenerDeferred);
  });

  it('resolves the returned promise when all listeners resolve', function () {
    service.registerListener(dummyListener);
    var promise = service.trigger();
    var promiseWasCalled = false;
    promise.then(function () { promiseWasCalled = true; });

    listenerDeferred.resolve();
    rootScope.$digest();

    expect(promiseWasCalled).toBe(true);
  });

});
