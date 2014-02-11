angular
    .rlmodule('rl.cpi.main.directives.rlRecommendation', ['ui.bootstrap'])
    .directive('rlRecommendation', function () {
        return {
            templateUrl: "modules/main/directives/rlRecommendation.html",
            scope: {
                recommendation: '='
            },
            restrict: 'E'
        };
    });
