angular
  .rlmodule('rl.cpi.main.directives.rlMetricButton', ['ui.bootstrap'])
  .directive('rlMetricButton', function () {
    return {
      templateUrl: "modules/main/directives/rlMetricButton.html",
      scope: {
        btnName: '=',
        btnValue: '=',
        hinttext: '='
      },
      restrict: 'E'
    };
  });
