angular.rlmodule('rl.cpi.campaign')
.controller('RecommendationsCtrl',
function ($scope, recommendations) {
  $scope.recommendations = recommendations;
});
