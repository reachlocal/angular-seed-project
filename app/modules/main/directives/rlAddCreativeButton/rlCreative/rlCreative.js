angular
    .rlmodule('rl.cpi.main.directives.rlCreative', [])
    .controller('rlCreativeCtrl', function($scope) {
        return {};
    })
    .directive('rlCreative', function () {
        return {
            templateUrl: "modules/main/directives/rlAddCreativeButton/rlCreative/rlCreative.html",
            scope: {
                publisher: '=',
                masterCreative: '='
            },
            restrict: 'E',
            replace: false,
            controller: 'rlCreativeCtrl'
        };
    });
