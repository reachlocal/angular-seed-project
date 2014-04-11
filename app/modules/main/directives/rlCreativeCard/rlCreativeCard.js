angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCard', [])
    .controller('rlCreativeCardCtrl', function ($scope) {
        var syncing;
        var stopSyncing = angular.noop;

        function synchronize (value) {
            syncing = true;
            $scope.creative = angular.copy(value);
        }

        $scope.link = function link () {
            $scope.isLinked = true;
            stopSyncing = $scope.$watch('linkedTo', synchronize , true);
        };

        $scope.unlink = function unlink () {
            if (!syncing) {
                stopSyncing();
                $scope.isLinked = false;
            }
            syncing = false;
        };

        $scope.creative = $scope.ngModel;
        if ($scope.linkedTo) { $scope.link(); }
        $scope.$watch('creative', $scope.unlink, true);
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
