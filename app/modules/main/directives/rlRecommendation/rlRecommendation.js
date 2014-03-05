angular
    .rlmodule('rl.cpi.main.directives.rlRecommendation', ['ui.bootstrap'])
    .directive('rlRecommendation', function () {
        return {
            templateUrl: "modules/main/directives/rlRecommendation/rlRecommendation.html",
            scope: {
                expanded: '=?',
                recommendation: '='
            },
            restrict: 'E'
        };
    });
