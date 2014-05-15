angular.rlmodule('rl.cpi.campaignNewCreative')
.controller('NewCreativeCtrl', function ($scope, publishers, $window) {
  $scope.publishers = publishers.webPublisherCampaigns;
  $scope.masterCreative = { headLine: '', descriptiveLine: ['', ''] };
  $scope.back = function () {
    $window.history.back();
  };
});
