// Load the rlConfig global variable in a more angular-way
angular.rlmodule('rl.helloworld.initialize.Config', [])
  .factory('Config', function () {
    if (typeof rlConfig === 'undefined' || !angular.isObject(rlConfig)) {
      throw new Error('Can\'t find config!  There may be a problem with your deployment.');
    }
    return rlConfig;
  });
