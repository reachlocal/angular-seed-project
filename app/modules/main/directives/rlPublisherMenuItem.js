angular
    .rlmodule('rl.cpi.main.directives.rlPublisherMenuItem', ['ui.bootstrap'])
    .directive('rlPublisherMenuItem', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherMenuItem.html",
            restrict: 'E',
            scope: { publisher: "=item" }
        };
    });
