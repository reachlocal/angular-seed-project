angular.rlmodule('rl.helloworld.sayhello.SayhelloCtrl', [])
  .config(function ($stateProvider) {
    $stateProvider.state('helloworld.sayhello', {
      url: '/sayhello',
      data: { title: 'New Creative' },
      templateUrl: 'modules/rl.helloworld/sayhello/sayhelloCtrl.html',
      controller: 'SayhelloCtrl'
    });
  })
  .controller('SayhelloCtrl', function ($scope) {
    $scope.hithere = '\'ello \'ello';
  });
