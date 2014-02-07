angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap', 'rl.cpi.main.services.publishers'])
    .directive('rlPublisherFilterNav', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav.html",
            scope: {},
            restrict: 'E',
            controller: function ($scope, Publishers) {
                $scope.publishers = Publishers.query();
            }
        };

    });
