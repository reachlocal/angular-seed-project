angular.rlmodule('rl.cpi.campaign')
.controller('campaign.controller.tabular-data',
function ($scope, creatives, Zippable, CreativeHeaders) {

  var zippedByCreatives = Zippable.build($scope.creatives, 'id', 'creative');

  function updateTable() {
    var zReports = Zippable.build($scope.reports, 'creativeId', 'report');
    zippedByCreatives.zip(zReports);
  }

  $scope.$watchCollection('creatives', updateTable);
  $scope.$watchCollection('reports', updateTable);
  $scope.table = zippedByCreatives;
  $scope.creatives = creatives;
  $scope.creativeHeaders = CreativeHeaders;

});
