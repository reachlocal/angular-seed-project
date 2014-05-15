angular.rlmodule('rl.cpi.campaign')
.controller('CreativeMetricsCtrl',
function ($scope, creatives, Zippable, CreativeHeaders, TextCreativeReports, QueryParams) {

  function getReports() {
    $scope.reports = TextCreativeReports.query({
      from: QueryParams.from,
      to: QueryParams.to,
      masterCampaignId: $scope.campaign.masterCampaignId
    });
  }

  function updateTable() {
    var zReports = Zippable.build($scope.reports, 'creativeId', 'report');
    zippedByCreatives.zip(zReports);
  }

  var zippedByCreatives = Zippable.build(creatives, 'id', 'creative');

  $scope.QueryParams = QueryParams;
  $scope.$watch('QueryParams.from+QueryParams.to', getReports);
  $scope.$watchCollection('creatives', updateTable);
  $scope.$watchCollection('reports', updateTable);
  $scope.table = zippedByCreatives;
  $scope.creatives = creatives;
  $scope.creativeHeaders = CreativeHeaders;

});
