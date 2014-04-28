angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap', 'rl.daterange', 'rl.cpi.main.services.Moment', 'rl.QueryParams'])
    .controller('rlPublisherFilterNavCtrl', function($scope, PublisherFilterService, Moment, QueryParams) {
        PublisherFilterService.load($scope.creatives);

        var dateFormat = 'YYYY-MM-DD';
        var today = Moment.build().format(dateFormat);
        function last (amount, granularity) {
            return Moment.build().subtract(granularity, amount).format(dateFormat);
        }
        var last30Days = { from: last(30, 'days'), to: today };
        var initialRange = last30Days;
        $scope.dateRangeOptions = {
            customLabel: 'rlPublisherFilterNav.dateRange.Custom',
            ranges: [
                { label: 'rlPublisherFilterNav.dateRange.Last 30 days',
                    value: last30Days },
                { label: 'rlPublisherFilterNav.dateRange.Last 60 days',
                    value: { from: last(60, 'days') , to: today } },
                { label: 'rlPublisherFilterNav.dateRange.Last 90 days',
                    value: { from: last(90, 'days') , to: today } },
                { label: 'rlPublisherFilterNav.dateRange.All time',
                    value: { from: '', to: today } }
            ],
            maxToDate: today,
            value: initialRange
        };

        $scope.publishers = PublisherFilterService.publishers;
        $scope.selectedPublisher = PublisherFilterService.selectedPublisher;
        $scope.selectedAdGroup   = PublisherFilterService.selectedAdGroup;

        $scope.selectedDateRange = QueryParams;

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
