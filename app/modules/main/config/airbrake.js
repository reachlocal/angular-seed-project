/**
 * Setup exception handler for airbrake.
 * (Just re-throw the error so airbrake can pick it up with the window.onerror method.)
 */
angular.rlmodule('rl.cpi.main.config.airbrake', []).factory('$exceptionHandler', function ($log) {
  return function (exception, cause) {
    $log.error(exception);
    exception.cause = cause;
    // Airbrake is registered globally
    if (!!window.Airbrake) {
      window.Airbrake.push({ error: exception });
    }
  };
});