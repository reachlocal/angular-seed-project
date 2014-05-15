angular.rlmodule('rl.cpi.campaignStagedChanges')
.controller('StagedChangesCtrl', function ($scope, creatives) {
  $scope.creatives = creatives.filter(function (creative) {
    return creative.isStaged();
  });
});
