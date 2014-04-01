angular
    .rlmodule('rl.cpi.main.directives.rlTabularData', ['ui.bootstrap', 'rl.cpi.main.filters.flexnumber', 'rl.cpi.main.services.Zippable'])
    .controller('rlTabularDataCtrl', function($scope, Zippable, $timeout) {
        var zippedByCreatives = Zippable.build($scope.creatives, 'id', 'creative');

        function updateTable() {
            var zReports   = Zippable.build($scope.reports, 'textCreativeId', 'report');
            zippedByCreatives.zip(zReports);
        }
        $scope.$watchCollection('creatives', updateTable);
        $scope.$watchCollection('reports', updateTable);
        $scope.table = zippedByCreatives;
    })
    .directive('rlTabularData', function () {
        return {
            templateUrl: "modules/main/directives/rlTabularData/rlTabularData.html",
            scope: {
                headers: '=',
                creatives: '=',
                reports: '='
            },
            restrict: 'E',
            controller: 'rlTabularDataCtrl',
            replace: true
        };
    });
