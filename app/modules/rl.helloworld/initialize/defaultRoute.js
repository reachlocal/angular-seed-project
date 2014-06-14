angular.rlmodule('rl.helloworld.initialize.DefaultRoute', ['ui.router', 'rl.helloworld.layout'])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/helloworld/sayhello');
})

.run(function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    $rootScope.pageTitle = [toState.data.title, 'ReachLocal'].join(' | ');
  });
});
