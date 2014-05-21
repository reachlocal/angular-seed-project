angular.rlmodule('rl.cpi.campaignStagedChanges', [
  'ui.router',
  'rl.back',
  'rl.cpi.main.directives',
  'rl.cpi.main.services.Creatives'
])
.config(function ($stateProvider) {
  $stateProvider.state('cpi.campaignStagedChanges', {
    url: '/staged-changes',
    data: { title: 'Staged Changes' },
    templateUrl: 'modules/rl.cpi/campaign.staged-changes/staged-changes.html',
    controller: 'StagedChangesCtrl',
    resolve: {
      creatives: function (Creatives, $stateParams) {
        var creatives = Creatives.query($stateParams);
        return creatives.$promise;
      }
    }
  });
})
.controller('StagedChangesCtrl', function ($scope, creatives) {
  $scope.creatives = creatives.filter(function (creative) {
    return creative.isStaged();
  });
});
