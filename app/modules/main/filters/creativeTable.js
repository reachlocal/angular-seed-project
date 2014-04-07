angular
    .rlmodule('rl.cpi.main.filters.CreativeTable', ['rl.cpi.main.services.PublisherFilterService'])
    .filter('CreativeTable', function (PublisherFilterService) {
        return function (input) {
            if (!PublisherFilterService.isFiltering()) {
                return input;
            } else {
                return input.filter(function (row) {
                    return PublisherFilterService.isDisplayed(row.creative);
                });
            }
        };
    });
