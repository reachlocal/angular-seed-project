angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCard', [])
    .controller('rlCreativeCardCtrl', function($scope) {
        var isSyncing = false;
        var syncListener = angular.noop;

        function listener(newValue, oldValue) {
            isSyncing = true;
            $scope.creative = {
                headLine: newValue.headLine,
                descriptiveLine: [
                    newValue.descriptiveLine[0],
                    newValue.descriptiveLine[1]
                ]
            };
        }

        if ($scope.basedOn) {
            syncListener = $scope.$watch("basedOn", listener, true);
        } else {
            $scope.creative = $scope.masterOf;
        }

        $scope.$watch('creative', function(newValue, oldValue) {
            if (!isSyncing) {
                syncListener();
            }
            isSyncing = false;
        }, true);

        $scope.linkWithMaster = function() {
        };
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
