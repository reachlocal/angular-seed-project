// Basic integration test - no mocks
describe('SayHello Controller', function () {

  var $scope;

  beforeEach(function () {
    // Load pre-computed locales to prevent l10n system from lazy-loading them
    localeFixture();

    // Load the module we're testing
    module('rl.helloworld.sayhello.SayhelloCtrl');
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