angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap'])
    .directive('rlPublisherFilterNav', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav.html",
            scope: {
                publishers: '='
            },
            restrict: 'E'
        };
    });
