angular
    .rlmodule('rl.cpi.main.services.Moment', [])
    .factory('Moment', function() {
        return {
            build: function() { return window.moment.apply({}, arguments); }
        };
    });

