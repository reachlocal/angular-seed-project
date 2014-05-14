angular
  .rlmodule('rl.cpi.main.directives.rlCampaignHeader', ['ui.bootstrap'])
  .directive('rlCampaignHeader', function () {
    return {
      templateUrl: 'modules/rl.cpi/directives/rlCampaignHeader/rlCampaignHeader.html',
      scope: {
        overview: '='
      },
      restrict: 'E',
      replace: true
    };
  });
