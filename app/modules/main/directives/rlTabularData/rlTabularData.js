angular
    .rlmodule('rl.cpi.main.directives.rlTabularData', ['ui.bootstrap', 'rl.cpi.main.filters.flexnumber', 'rl.cpi.main.services.Zippable'])
    .controller('rlTabularDataCtrl', function($scope, Zippable) {
        function updateTable() {
            var zCreatives = Zippable.build($scope.creatives, 'id', 'creative');
            var zReports   = Zippable.build($scope.reports, 'textCreativeId', 'report');
            $scope.table = zCreatives.zip(zReports);
        }
        $scope.$watchCollection('creatives', updateTable);
        $scope.$watchCollection('reports', updateTable);
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
            controller: 'rlTabularDataCtrl'
        };
    });
