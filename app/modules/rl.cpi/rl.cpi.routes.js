angular.rlmodule('rl.cpi.routes', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/campaign/713896');

  $stateProvider.state('cpi', {
    abstract: true,
    url: '/campaign/:campaignId',
    templateUrl: 'modules/rl.cpi/index.html',
    controller: function ($scope, campaign) { $scope.campaign = campaign; },
    resolve: { campaign: function (CampaignOverview, $stateParams) {
      return CampaignOverview.get($stateParams).$promise;
    }}
  });

});
