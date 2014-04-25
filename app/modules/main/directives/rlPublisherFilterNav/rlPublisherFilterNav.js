angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap', 'rl.daterange'])
    .controller('rlPublisherFilterNavCtrl', function($scope, PublisherFilterService, DateRange) {
        PublisherFilterService.load($scope.creatives);
        $scope.dateRangeOptions = DateRange.options;
        $scope.publishers = PublisherFilterService.publishers;
        $scope.selectedPublisher = PublisherFilterService.selectedPublisher;
        $scope.selectedAdGroup   = PublisherFilterService.selectedAdGroup;

        $scope.$watch('selectedPublisher', PublisherFilterService.setPublisher);
        $scope.$watch('selectedAdGroup', PublisherFilterService.setAdGroup);
        $scope.$watch('selectedDateRange', DateRange.setRange, true);
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
