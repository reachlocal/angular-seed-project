angular.rlmodule('rl.cpi.main.Routes', ['ui.router'])
    .config(function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/campaign/1');
        //$locationProvider.html5Mode(true);
    });
