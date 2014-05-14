/**
 * Allow the user to format a number using one of these
 * 'standard' formats
 * Usage:  {{ 123 | flexnumber:percent }} becomes "123.00%"
 */
angular
  .rlmodule('rl.cpi.main.filters.FlexNumber', [])
  .filter('flexnumber', function ($filter) {
    return function (input, filterName) {
      if (input === undefined || input === '' || input === null) {
        return 'N/A';
      } else {
        input = parseFloat(input);
        if (filterName === 'currency') {
          return $filter('currency')(input, '$');
        } else if (filterName === 'integer') {
          return $filter('number')(input, 0);
        } else if (filterName === 'decimal') {
          return $filter('number')(input, 2);
        } else if (filterName === 'percent') {
          return $filter('number')(input * 100, 2) + '%';
        } else {
          return input;
        }
      }
    };
  });
