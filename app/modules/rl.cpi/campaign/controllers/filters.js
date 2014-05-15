angular.rlmodule('rl.cpi.campaign')
.controller('campaign.controllers.filters',
function ($scope, creatives, QueryParams, DateRangeOptions, PublisherFilterService) {

  $scope.selectedDateRange = QueryParams;
  $scope.dateRangeOptions = DateRangeOptions.build();
  $scope.dateRangeOptions.labelPrefix('rlCampaignFilters.dateRange.');

  $scope.countStagedChanges = function () {
    return creatives.filter(function (creative) {
      return creative.isStaged();
    }).length;
  };

  // Setup filter drop-downs
  PublisherFilterService.load(creatives);
  $scope.publisherFilter = PublisherFilterService;

  $scope.$watch('selectedPublisher', PublisherFilterService.setPublisher);
  $scope.$watch('selectedAdGroup', PublisherFilterService.setAdGroup);

});
