angular
    .rlmodule('rl.cpi.main.directives.rlRecommendations', ['ui.bootstrap'])
    .controller('rlRecommendationsCtrl', function($scope) {
        var userHasClosedWellDoneMessage = false;

        $scope.showWellDoneMessage = function() {
            return !$scope.recommendations.hasActiveRecommendations() && !userHasClosedWellDoneMessage;
        };
        $scope.closeWellDoneMessage = function() {
            userHasClosedWellDoneMessage = true;
        };
    })
    .directive('rlRecommendations', function () {
        return {
            templateUrl: "modules/main/directives/rlRecommendations/rlRecommendations.html",
            scope: {
                recommendations: '='
            },
            restrict: 'E',
            controller: 'rlRecommendationsCtrl'
        };
    });
