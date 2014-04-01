angular
    .rlmodule('rl.cpi.main.directives.rlDateRange', ['ui.bootstrap', 'rl.cpi.main.services.Moment', 'rl.cpi.main.services.DateRange'])

    .controller('rlDateRangeCtrl', function($scope, Moment, DateRange) {
        var dateFormat = "YYYY-MM-DD";
        $scope.dateOptions = {
            "show-weeks": false
        };

        $scope.from = DateRange.from().format(dateFormat);
        $scope.to   = DateRange.to().format(dateFormat);

        $scope.$watch('from', function(value) {
            DateRange.from(value);
        });
        $scope.$watch('to', function(value) {
            DateRange.to(value);
        });

        $scope.$on('rl:dateRange:updated', function(event, range) {
            $scope.from = range.from.format(dateFormat);
            $scope.to   = range.to.format(dateFormat);
        });
    })
    .directive('rlDateRange', function () {
        return {
            templateUrl: "modules/main/directives/rlDateRange/rlDateRange.html",
            scope: {},
            restrict: 'E',
            controller: 'rlDateRangeCtrl',
            replace: true
        };
    });
