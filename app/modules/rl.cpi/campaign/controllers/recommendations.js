angular.rlmodule('rl.cpi.campaign')
.controller('campaign.controllers.recommendations',
function ($scope, recommendations) {
  $scope.recommendations = recommendations;
});
