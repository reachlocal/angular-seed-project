angular.rlmodule('rl.cpi.campaign')
.controller('campaign.controller.filters',
function ($scope, creatives, QueryParams, DateRangeOptions, PublisherFilterService) {

  $scope.selectedDateRange = QueryParams;
  $scope.dateRangeOptions = DateRangeOptions.build();
  $scope.dateRangeOptions.labelPrefix('rlPublisherFilterNav.dateRange.');

  $scope.countStagedChanges = function () {
    return creatives.filter(function (creative) {
      return creative.isStaged();
    }).length;
  };

  // Setup filter drop-downs
  PublisherFilterService.load($scope.creatives);
  $scope.publisherFilter = PublisherFilterService;

  $scope.$watch('selectedPublisher', PublisherFilterService.setPublisher);
  $scope.$watch('selectedAdGroup', PublisherFilterService.setAdGroup);

});
