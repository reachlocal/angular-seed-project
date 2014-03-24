angular
    .rlmodule('rl.cpi.main.filters.CreativeTable', ['ui.router', 'rl.cpi.main.services.toArray'])
    .filter('CreativeTable', function ($stateParams, toArray) {
        return function (input) {
            // Parse out search filter
            var adgroups = toArray($stateParams.adgroups);

            // Run search
            if (adgroups.length === 0) {
                return input;
            }
            return input.filter(function (row) {
                return adgroups.indexOf(row.creative.adGroup.id) > -1;
            });
        };
    });
