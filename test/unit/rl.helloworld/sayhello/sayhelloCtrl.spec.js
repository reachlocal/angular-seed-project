describe('SayHello Controller', function () {

  var $scope;
  var mockRandomGreeting = {
    get: angular.noop
  };

  beforeEach(function () {
    // Load the module we're testing
    module('rl.helloworld');
  });

  function injectController() {
    // Inject our service so we can test it
    inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $controller('SayhelloCtrl', { $scope: $scope, RandomGreeting: mockRandomGreeting });
    });
  }

  describe('when page loads', function () {
    it('should have a random greeting', function () {
      spyOn(mockRandomGreeting, 'get').andReturn('FOO');
      injectController();

      expect($scope.greeting).toBe('FOO');
    });
  });

  it('selects random greetings', function () {
    injectController();
    spyOn(mockRandomGreeting, 'get').andReturn('BAR');

    $scope.newGreeting();

    expect($scope.greeting).toBe('BAR');
  });

});