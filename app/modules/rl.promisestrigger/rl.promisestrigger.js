/**
 * Allow a controller/service/whatever to trigger a bunch of other
 * controllers/services/whatevers to do some async action and return
 * a promise that wraps all the other promises.
 *
 * -listeners (you can have 0 to many of these)
 *   promisestrigger.registerListener(function () {
 *     var promise = somethingAsync();
 *     return promise;
 *   })
 *
 * -controller (you can only have 1 of these)
 *   var promiseAll = promisestrigger.trigger();
 *   promiseAll.then(function () { console.log('All Done!'); });
 **/
angular.rlmodule('rl.promisestrigger', [])
  .factory('promisestrigger', function promisestrigger($q) {

    function PromisesTrigger() {

      var callbacks = [];

      /**
       * When trigger is called, we'll run this callback
       * It should return a promise, which we will bundle up
       * for the trigger() method's return value
       **/
      function registerListener(callback) {
        callbacks.push(callback);
      }
      this.registerListener = registerListener;

      /**
       * How many listeners are registered?
       **/
      function listenerCount() {
        return callbacks.length;
      }
      this.listenerCount = listenerCount;

      /**
       * Trigger all registered listeners and gather up their
       * promises in a wrapper promise
       */
      function trigger() {
        var promises = [];
        angular.forEach(callbacks, function (callback) {
          if (!angular.isFunction(callback)) {
            throw new Error('A callback registered with rl.proimstrigger was not a function: ' + JSON.stringify(callback));
          }
          var promise = callback();
          // Ignore callbacks that return something that is not a promise
          if (!!promise && angular.isFunction(promise.then)) {
            promises.push(promise);
          }
        });
        return $q.all(promises);
      }
      this.trigger = trigger;

    }

    return {
      build: function build() {
        return new PromisesTrigger();
      }
    };
  });