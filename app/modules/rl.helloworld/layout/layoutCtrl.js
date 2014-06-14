angular.rlmodule('rl.helloworld.layout.LayoutCtrl', [])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('helloworld', {
      abstract: true,
      url: '/helloworld',
      templateUrl: 'modules/rl.helloworld/layout/layout.html',
      controller: 'LayoutCtrl'
    });
  })

  .controller('LayoutCtrl', function ($scope) {
    $scope.data = ['this','is','a','test'];
  });
