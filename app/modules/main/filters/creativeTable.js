angular
    .rlmodule('rl.cpi.main.filters.CreativeTable', ['rl.cpi.main.services.AdgroupFilter'])
    .filter('CreativeTable', function (AdgroupFilter) {
        return function (input) {
            if (!AdgroupFilter.isFiltering()) {
                return input;
            } else {
                return input.filter(function (row) {
                    return AdgroupFilter.isDisplayed(row.creative.adGroup.id);
                });
            }
        };
    });
