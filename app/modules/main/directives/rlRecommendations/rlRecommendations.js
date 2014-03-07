angular
    .rlmodule('rl.cpi.main.directives.rlRecommendations', ['ui.bootstrap'])
    .directive('rlRecommendations', function () {
        return {
            templateUrl: "modules/main/directives/rlRecommendations/rlRecommendations.html",
            scope: {
                recommendations: '='
            },
            restrict: 'E'
        };
    })
