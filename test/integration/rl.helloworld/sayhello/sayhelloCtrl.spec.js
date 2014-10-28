// Basic integration test - no mocks
describe('SayHello Controller', function () {

  var $scope;

  beforeEach(function () {
    // Load the module we're testing
    module('rl.helloworld');
  });

  function injectController() {
    // Inject our service so we can test it
    inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $controller('SayhelloCtrl', { $scope: $scope });
    });
  }

  describe('when page loads', function () {
    it('should have a random greeting', function () {
      injectController();

      expect($scope.greeting === null).toBe(false);
    });
  });

});