angular
  .rlmodule('rl.cpi.main.directives.rlCreativeState', ['ui.bootstrap'])
  .controller('rlCreativeStateCtrl', function ($scope) {
    function isActive() {
      return $scope.creative.state === 'ACTIVE';
    }
    function isDisabled() {
      return $scope.creative.state === 'DISABLED';
    }

    $scope.isActive = isActive;
    $scope.isDisabled = isDisabled;

    $scope.toggleActive = function toggleActive() {
      if (isDisabled()) { return; }
      var updatedModel = angular.copy($scope.creative);
      var newState = isActive() ? 'INACTIVE' : 'ACTIVE';
      updatedModel.state = newState;
      var promise = updatedModel.$update();
      return promise.then(
        function updateSuccess() {
          $scope.creative.state = newState;
        }
      );
    };

  })
  .directive('rlCreativeState', function () {
    return {
      templateUrl: 'modules/rl.cpi/campaign/creative-metrics/creative-state/creative-state.html',
      scope: {
        creative: '='
      },
      restrict: 'E',
      replace: true,
      controller: 'rlCreativeStateCtrl'
    };
  });
