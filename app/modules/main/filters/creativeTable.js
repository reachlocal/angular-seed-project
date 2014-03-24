angular
    .rlmodule('rl.cpi.main.filters.CreativeTable', ['ui.router'])
    .filter('CreativeTable', function ($stateParams) {
        window.$stateParams = $stateParams;
        return function (input) {
            // Parse out search filter
            var adgroups = []; // Default to blank array
            if (angular.isArray($stateParams.adgroups)) {
                adgroups = $stateParams.adgroups; // If there's a search array, we'll use that
            } else {
                try {
                    // If there's a search array in the form of a string, parse it and use that
                    var adgroupsFilter = JSON.parse($stateParams.adgroups);
                    if (angular.isArray(adgroupsFilter)) {
                        adgroups = adgroupsFilter;
                    }
                } catch (err) {
                    // Leave adgroups set to empty array
                }
            }

            // Run search
            if (adgroups.length === 0) {
                return input;
            }
            return input.filter(function (row) {
                return adgroups.indexOf(row.creative.adGroup.id) > -1;
            });
        };
    });
