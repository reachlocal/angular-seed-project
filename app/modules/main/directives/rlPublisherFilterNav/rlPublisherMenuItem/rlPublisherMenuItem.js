angular
    .rlmodule('rl.cpi.main.directives.rlPublisherMenuItem', ['ui.bootstrap'])
    .controller('rlPublisherMenuItemCtrl', function($scope) {
        $scope.collapsed = true;
        $scope.toggleCollapsed = function() {
            $scope.collapsed = !$scope.collapsed;
        };
    })
    .directive('rlPublisherMenuItem', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav/rlPublisherMenuItem/rlPublisherMenuItem.html",
            restrict: 'E',
            scope: { publisher: "=item" },
            controller: 'rlPublisherMenuItemCtrl'
        };
    });
