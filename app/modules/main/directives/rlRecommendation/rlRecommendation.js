angular
    .rlmodule('rl.cpi.main.directives.rlRecommendation', ['ui.bootstrap'])
    .directive('rlRecommendation', function () {
        return {
            require: '^accordion',
            templateUrl: "modules/main/directives/rlRecommendation/rlRecommendation.html",
            scope: {
                recommendation: '='
            },
            restrict: 'E'
        };
    });
