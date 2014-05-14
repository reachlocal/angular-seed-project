/**
 * This sets up a standard way to load our configuration.  It allows us to change
 * the underlying implementation for managing configs without messing with consumers
 * of the config.
 *
 * It also loads the super-helpful ngAnimate module since we're going to use it pretty
 * much everywhere.  (Not sure if this is a great idea.)
 */
angular
  .rlmodule('rl.cpi.main.Config', ['ngAnimate'])
  .factory('Config', function () {
    /**
     * Currently, we're defining our config in the app/config.js file.
     * It creates a global object called 'rlConfig'.
     * If that variable exists, return that.  If it does not exist, PANIC!
     */
    var configDefaults = {
      gatewayBaseUrl: "http://localhost:8001",
      defaultLocale: 'en',
      locales: ['en', 'pt']
    };
    if (typeof rlConfig !== 'undefined' && angular.isObject(rlConfig)) {
      angular.forEach(rlConfig, function (value, key) {
        configDefaults[key] = value;
      }, this);
    } else {
      console.warn("WARNING: No config.js found for client app - using defaults");
    }
    return configDefaults;
  });
