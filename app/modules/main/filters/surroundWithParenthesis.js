angular
    .rlmodule('rl.cpi.main.filters.SurroundWithParenthesis', [])
    .filter('surroundWithParenthesis', function () {
        return function (input) {
            if (!input) {
                return input;
            }
            return "(" + input + ")";
        };
    });
