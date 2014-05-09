angular
  .rlmodule('rl.cpi.main.services.Moment', [])
  .factory('Moment', function ($window) {
    return {
      build: function () {
        return $window.moment.apply({}, arguments);
      }
    };
  });

