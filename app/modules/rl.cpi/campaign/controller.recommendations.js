angular.rlmodule('rl.cpi.campaign')
.controller('campaign.controller.recommendations',
function ($scope, recommendations) {
  $scope.recommendations = recommendations;
});
