angular
    .rlmodule('rl.cpi.main.filters.Capitalize', [])
    .filter('capitalize', function () {
        return function (input) {
            if (!input) {
                return input;
            }
            var head = input[0];
            var tail = input.length > 1 ? input.substring(1, input.length + 1) : "";
            return head.toUpperCase() + tail.toLowerCase();
        };
    });
