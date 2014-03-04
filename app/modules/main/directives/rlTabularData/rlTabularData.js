angular
    .rlmodule('rl.cpi.main.directives.rlTabularData', ['ui.bootstrap', 'rl.cpi.main.filters.flexnumber'])
    .directive('rlTabularData', function () {
        return {
            templateUrl: "modules/main/directives/rlTabularData/rlTabularData.html",
            scope: {
                headers: '=',
                data: '='
            },
            restrict: 'E'
        };
    });
