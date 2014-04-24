angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCard', [])
    .controller('rlCreativeCardCtrl', function ($scope) {
        var stopSyncing = angular.noop;

        function synchronize (value) {
            $scope.creative = angular.copy(value);
        }

        $scope.link = function link () {
            $scope.isLinked = true;
            stopSyncing = $scope.$watch('linkedTo', synchronize , true);
        };

        $scope.unlink = function unlink () {
          stopSyncing();
          $scope.isLinked = false;
        };

        $scope.creative = $scope.ngModel;
        if ($scope.linkedTo) { $scope.link(); }

    })

    .directive('rlCreativeCard', function () {
        return {
            templateUrl: 'modules/main/directives/rlCreativeCard/rlCreativeCard.html',
            scope: {
                publisher: '=',
                ngModel: '=',
                linkedTo: '='
            },
            restrict: 'E',
            replace: true,
            controller: 'rlCreativeCardCtrl'
        };
    });
