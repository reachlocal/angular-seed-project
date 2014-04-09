angular
    .rlmodule('rl.cpi.main.directives.rlAddCreativeButton', ['rl.cpi.main.directives.rlCreative', 'ngAnimate'])
    .controller('rlAddCreativeButtonCtrl', function($scope) {
        $scope.isDialogDisplayed = false;
        $scope.displayDialog = function() {
            $scope.isDialogDisplayed = true;
        };
        $scope.hideDialog = function() {
            $scope.isDialogDisplayed = false;
        };
    })
    .directive('rlAddCreativeButton', function () {
        return {
            templateUrl: "modules/main/directives/rlAddCreativeButton/rlAddCreativeButton.html",
            scope: {
                publishers: '='
            },
            restrict: 'E',
            replace: false,
            controller: 'rlAddCreativeButtonCtrl'
        };
    });
