angular.rlmodule('rl.cpi.main.routes', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/campaign');

        $stateProvider
            .state('campaign', {
                url: '/campaign',
                templateUrl: 'modules/main/controllers/campaign.html',
                controller: 'Campaign'
            });
    });