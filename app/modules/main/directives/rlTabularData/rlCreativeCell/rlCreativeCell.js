angular
    .rlmodule('rl.cpi.main.directives.rlCreativeCell', ['ui.bootstrap'])
    .controller('rlCreativeCellCtrl', function($scope) {
        $scope.edit = false;
        $scope.toggleEdit = function() {
            $scope.edit = !$scope.edit;
        };
    })
    .directive('rlCreativeCell', function() {
        return {
            templateUrl: "modules/main/directives/rlTabularData/rlCreativeCell/rlCreativeCell.html",
            scope: {
                creative: '='
            },
            restrict: 'E',
            controller: 'rlCreativeCellCtrl'
        };
    });