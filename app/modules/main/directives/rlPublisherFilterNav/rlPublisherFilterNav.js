angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap', 'rl.daterange', 'rl.cpi.main.services.Moment', 'rl.QueryParams'])
    .controller('rlPublisherFilterNavCtrl', function ($scope, PublisherFilterService, DateRangeOptions, QueryParams) {
        // Attach the QueryParams object to our calendar - it's uh...  global.  :S
        $scope.selectedDateRange = QueryParams;
        $scope.dateRangeOptions = DateRangeOptions.build();
        $scope.dateRangeOptions.labelPrefix('rlPublisherFilterNav.dateRange.');

        $scope.countStagedChanges = function() {
          return $scope.creatives.filter(function (creative) {
            return creative.isStaged();
          }).length;
        };

        // Setup filter drop-downs
        PublisherFilterService.load($scope.creatives);
        $scope.publisherFilter = PublisherFilterService;

        $scope.$watch('selectedPublisher', PublisherFilterService.setPublisher);
        $scope.$watch('selectedAdGroup', PublisherFilterService.setAdGroup);
    })
    .directive('rlPublisherFilterNav', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav/rlPublisherFilterNav.html",
            scope: {
                creatives: '='
            },
            restrict: 'E',
            replace: true,
            controller: 'rlPublisherFilterNavCtrl'
        };
    });
