angular
    .rlmodule('rl.cpi.main.directives.rlCampaignHeader', ['ui.bootstrap'])
    .directive('rlCampaignHeader', function () {
        return {
            templateUrl: "modules/main/directives/rlCampaignHeader/rlCampaignHeader.html",
            scope: {
                overview: '='
            },
            restrict: 'E',
            replace: true
        };
    });
