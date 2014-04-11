angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCard', [])
    .controller('rlCreativeCardCtrl', function($scope) {
        $scope.creative = $scope.basedOn || $scope.masterOf;
    })
    .directive('rlCreativeCard', function () {
        return {
            templateUrl: "modules/main/directives/rlCreativeCard/rlCreativeCard.html",
            scope: {
                publisher: '=',
                masterOf: '=',
                basedOn: '='
            },
            restrict: 'E',
            replace: true,
            controller: 'rlCreativeCardCtrl'
        };
    });
