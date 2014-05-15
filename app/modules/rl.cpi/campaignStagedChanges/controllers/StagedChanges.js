angular.rlmodule('rl.cpi.campaignStagedChanges')
.controller('campaignStagedChanges.controllers.StagedChanges', function ($scope, creatives) {
  $scope.creatives = creatives.filter(function (creative) {
    return creative.isStaged();
  });
});
