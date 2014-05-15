angular.rlmodule('rl.cpi.routes', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/campaign/1422307');

  $stateProvider.state('cpi', {
    abstract: true,
    url: '/campaign/:campaignId',
    templateUrl: 'modules/rl.cpi/rl.cpi.html',
    controller: function ($scope, campaign) {
      $scope.campaign = campaign;
    },
    resolve: {
      campaign: function (CampaignOverview, $stateParams) {
        return CampaignOverview.get($stateParams).$promise;
      }
    }
  });

})

.run(function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    $rootScope.pageTitle = [toState.data.title, 'ReachLocal'].join(' | ');
  });
});
