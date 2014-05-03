angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap', 'rl.daterange', 'rl.cpi.main.services.Moment', 'rl.QueryParams'])
    .controller('rlPublisherFilterNavCtrl', function ($scope, PublisherFilterService, DateRangeOptions, QueryParams) {
        // Attach the QueryParams object to our calendar - it's uh...  global.  :S
        $scope.selectedDateRange = QueryParams;
        $scope.dateRangeOptions = DateRangeOptions.build(); // The defaults are fine

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
