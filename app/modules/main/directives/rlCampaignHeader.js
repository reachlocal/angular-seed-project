angular
    .rlmodule('rl.cpi.main.directives.rlCampaignHeader', ['ui.bootstrap'])
    .directive('rlCampaignHeader', function () {
        return {
            templateUrl: "modules/main/directives/rlCampaignHeader.html",
            scope: {
                overview: '='
            },
            restrict: 'E'
        };
    });
