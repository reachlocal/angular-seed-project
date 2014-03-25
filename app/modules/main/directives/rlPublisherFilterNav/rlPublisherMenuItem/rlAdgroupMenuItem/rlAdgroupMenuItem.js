angular
    .rlmodule('rl.cpi.main.directives.rlAdgroupMenuItem', ['ui.bootstrap', 'rl.cpi.main.services.AdgroupFilter'])
    .controller('rlAdgroupMenuItemCtrl', function ($scope, AdgroupFilter) {
        var id = $scope.adgroup.id;
        $scope.checked = AdgroupFilter.isDisplayed(id);

        function watchSelected(selected) {
            if (selected) {
                AdgroupFilter.add(id);
            } else {
                AdgroupFilter.remove(id);
            }
        }

        $scope.$watch('selected', watchSelected);
    })
    .directive('rlAdgroupMenuItem', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav/rlPublisherMenuItem/rlAdgroupMenuItem/rlAdgroupMenuItem.html",
            restrict: 'E',
            scope: { adgroup: "=" },
            controller: 'rlAdgroupMenuItemCtrl'
        };
    });
