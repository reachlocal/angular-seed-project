angular
    .rlmodule('rl.cpi.main.directives.rlDateRange', ['ui.bootstrap', 'rl.cpi.main.services.Moment', 'ui.router'])

    .controller('rlDateRangeCtrl', function($scope, $rootScope, Moment, $state, $location) {
        var dateFormat = "YYYY-MM-DD";
        $scope.dateOptions = {
            "show-weeks": false
        };
        $scope.today = Moment.build().format(dateFormat);
        var from, to;

        if (!$location.search().dateFrom) {
            from = Moment.build().subtract('days', 30);
        } else {
            from = Moment.build($location.search().dateFrom);
        }
        if (!$location.search().dateTo) {
            to   = Moment.build();
        } else {
            to = Moment.build($location.search().dateTo);
        }

        $scope.from = from.format(dateFormat);
        $scope.to   = to.format(dateFormat);

        function update() {
            $rootScope.$broadcast('rl:dateRange:updated', { from: from, to: to });
            $location.search('dateFrom', from.format(dateFormat));
            $location.search('dateTo', to.format(dateFormat));
            $state.go($state.current);
        }

        $scope.$watch('from', function(value) {
            from = Moment.build(value);
            update();
        });
        $scope.$watch('to', function(value) {
            to = Moment.build(value);
            update();
        });
        update();
    })
    .directive('rlDateRange', function () {
        return {
            templateUrl: "modules/main/directives/rlDateRange/rlDateRange.html",
            scope: {},
            restrict: 'E',
            controller: 'rlDateRangeCtrl'
        };
    });
