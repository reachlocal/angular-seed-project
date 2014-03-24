angular
    .rlmodule('rl.cpi.main.directives.rlAdgroupMenuItem', ['ui.bootstrap'])
    .controller('rlAdgroupMenuItemCtrl', function ($scope) {
        $scope.selected = false;
    })
    .directive('rlAdgroupMenuItem', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav/rlPublisherMenuItem/rlAdgroupMenuItem/rlAdgroupMenuItem.html",
            restrict: 'E',
            scope: { adgroup: "=" },
            controller: 'rlAdgroupMenuItemCtrl'
        };
    });
