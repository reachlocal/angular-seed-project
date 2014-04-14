/**
 * Allow the user to
 */
angular
    .rlmodule('rl.cpi.main.filters.flexnumber', [])
    .filter('flexnumber', function($filter) {
        return function(input, filterName) {
            if (input === undefined || input === '') {
                return 'N/A';
            } else {
                if (filterName === 'currency') {
                    return $filter('currency')(input, "$");
                } else if (filterName === 'integer') {
                    return $filter('number')(input, 0);
                } else if (filterName === 'decimal') {
                    return $filter('number')(input, 2);
                } else if (filterName === 'percent') {
                    return $filter('number')(input, 2) + '%';
                } else {
                    return input;
                }
            }
        };
    });
