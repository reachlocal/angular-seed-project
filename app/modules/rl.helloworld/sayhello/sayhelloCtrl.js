angular.rlmodule('rl.helloworld.sayhello.SayhelloCtrl', ['rl.helloworld.initialize.Config', 'rl.helloworld.sayhello.RandomGreeting'])
  .config(function ($stateProvider) {
    $stateProvider.state('helloworld.sayhello', {
      url: '/sayhello',
      data: { title: 'New Creative' },
      templateUrl: 'modules/rl.helloworld/sayhello/sayhelloCtrl.html',
      controller: 'SayhelloCtrl'
    });
  })
  .controller('SayhelloCtrl', function ($scope, Config, RandomGreeting) {
    $scope.hithere = '\'ello \'ello';
    $scope.Config = Config;
    $scope.newGreeting = function newGreeting() {
      $scope.greeting = RandomGreeting.get();
    };
    $scope.newGreeting();
  });
