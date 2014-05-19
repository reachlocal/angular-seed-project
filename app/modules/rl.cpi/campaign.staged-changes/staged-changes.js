angular.rlmodule('rl.cpi.campaignStagedChanges', [
  // 'rl.cpi.main.directives',
  // 'rl.cpi.main.services.Creatives',
  // 'ui.router'
])
.config(function ($stateProvider) {
  $stateProvider.state('cpi.campaignStagedChanges', {
    url: '/staged-changes',
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
