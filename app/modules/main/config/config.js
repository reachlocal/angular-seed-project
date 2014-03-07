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
    .factory('Config', function() {
        /**
         * Currently, we're defining our config in the app/config.js file.
         * It creates a global object called 'rlConfig'.
         * If that variable exists, return that.  If it does not exist, PANIC!
         */
        var config = {};
        if (typeof rlConfig !== 'undefined' && angular.isObject(rlConfig)) {
            config = rlConfig;
        } else {
            console.error("FATAL ERROR!\n" +
                "Could not find configuration object: rlConfig.\n" +
                "Make sure app/config.js exists and is being loaded.");
        }
        return config;
    });
