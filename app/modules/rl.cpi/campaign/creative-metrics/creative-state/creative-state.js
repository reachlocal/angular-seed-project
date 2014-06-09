angular
  .rlmodule('rl.cpi.main.directives.rlCreativeState', ['ui.bootstrap'])
  .controller('rlCreativeStateCtrl', function ($scope) {
    function isActive() {
      return $scope.creative.state === 'ACTIVE';
    }

    $scope.isActive = isActive;

    $scope.toggleActive = function toggleActive() {
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

    $scope.isDisabled = function() {
      return $scope.creative.state === 'DISABLED';
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
