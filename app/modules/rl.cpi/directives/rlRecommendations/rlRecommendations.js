angular
  .rlmodule('rl.cpi.main.directives.rlRecommendations', ['ui.bootstrap'])
  .controller('rlRecommendationsCtrl', function ($scope) {
    var userHasClosedWellDoneMessage = false;
    var itemsExpandedState = $scope.recommendations.items.map(function () {
      return false;
    });

    $scope.toggleItemExpanded = function (index) {
      itemsExpandedState[index] = !itemsExpandedState[index];
    };
    $scope.isItemExpanded = function (index) {
      return itemsExpandedState[index];
    };
    $scope.showWellDoneMessage = function () {
      return !$scope.recommendations.hasActiveRecommendations() && !userHasClosedWellDoneMessage;
    };
    $scope.closeWellDoneMessage = function () {
      userHasClosedWellDoneMessage = true;
    };
  })
  .directive('rlRecommendations', function () {
    return {
      templateUrl: 'modules/rl.cpi/directives/rlRecommendations/rlRecommendations.html',
      scope: {
        recommendations: '='
      },
      restrict: 'E',
      controller: 'rlRecommendationsCtrl',
      replace: true
    };
  });
