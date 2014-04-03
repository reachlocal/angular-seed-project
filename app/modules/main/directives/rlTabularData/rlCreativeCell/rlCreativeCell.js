angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCell', ['ui.bootstrap', 'xeditable'])
    .controller('rlCreativeCellCtrl', function($scope) {
        var originalCreative;
        $scope.edit = false;

        $scope.enterEditMode = function() {
            originalCreative = angular.copy($scope.creative);
            $scope.edit = true;
        };

        $scope.cancelEditMode = function() {
            $scope.creative = originalCreative;
            $scope.edit = false;
        };

        $scope.save = function() {
            $scope.edit = false;
        };
    })
    .directive('rlCreativeCell', function() {
        return {
            templateUrl: "modules/main/directives/rlTabularData/rlCreativeCell/rlCreativeCell.html",
            scope: {
                creative: '='
            },
            restrict: 'E',
            controller: 'rlCreativeCellCtrl',
            replace: true
        };
    });