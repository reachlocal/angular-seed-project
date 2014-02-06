angular
    .rlmodule('rl.cpi.main.directives.rlAdGroupFilterNav', ['rl.cpi.main.services.adGroups'])
    .directive('rlAdGroupFilterNav', function () {
        return {
            template: "<nav></nav>",
            scope: {},
            restrict: 'E',
            controller: function ($scope, AdGroups) {
                $scope.adGroups = AdGroups.get();
            }
        };

    });
