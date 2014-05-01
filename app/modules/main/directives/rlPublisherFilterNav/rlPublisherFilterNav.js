angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap', 'rl.daterange', 'rl.cpi.main.services.Moment', 'rl.QueryParams'])
    .controller('rlPublisherFilterNavCtrl', function($scope, PublisherFilterService, Moment, QueryParams) {
        // Setup calendar
        $scope.selectedDateRange = QueryParams;
        var dateFormat = 'YYYY-MM-DD';
        var today = Moment.build().format(dateFormat);
        function last(amount, granularity) {
            return Moment.build().subtract(granularity, amount).format(dateFormat);
        }
        // Return { from: [first day of current month], to: [last day of current month] }
        function currentMonth() {
            var thisMonth = Moment.build();
            var monthNumber = thisMonth.month();
            var daysInMonth = thisMonth.daysInMonth();
            var firstDay = Moment.build().month(monthNumber).date(1);
            var lastDay = Moment.build().month(monthNumber).date(daysInMonth);
            return { from: firstDay.format(dateFormat), to: lastDay.format(dateFormat) };
        }
        var last30Days = { from: last(30, 'days'), to: today };
        var initialRange = last30Days;
        if (!!QueryParams.to) {
            initialRange = {
                from: QueryParams.from,
                to:   QueryParams.to
            };
        }
        $scope.dateRangeOptions = {
            customLabel: 'rlPublisherFilterNav.dateRange.Custom',
            ranges: [
                { label: 'rlPublisherFilterNav.dateRange.Current month',
                    value: currentMonth() },
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
