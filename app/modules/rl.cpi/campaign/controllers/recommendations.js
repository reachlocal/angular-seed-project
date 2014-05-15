angular.rlmodule('rl.cpi.campaign')
.controller('campaign.controllers.Recommendations',
function ($scope, recommendations) {
  $scope.recommendations = recommendations;
});
