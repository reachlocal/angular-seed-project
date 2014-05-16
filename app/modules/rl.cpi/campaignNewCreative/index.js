angular.rlmodule('rl.cpi.campaignNewCreative', [
  'ui.router',
  'rl.cpi.main.services.Publishers'
])
.config(function ($stateProvider) {
  $stateProvider.state('cpi.campaignNewCreative', {
    url: '/new-creative',
    templateUrl: 'modules/rl.cpi/campaignNewCreative/index.html',
    controller: 'NewCreativeCtrl',
    resolve: {
      publishers: function (Publishers, $stateParams) {
        var publishers = Publishers.get({campaignId: $stateParams.campaignId});
        return publishers.$promise;
      }
    }
  });
});
