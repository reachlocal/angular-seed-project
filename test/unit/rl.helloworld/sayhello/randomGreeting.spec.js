describe('RandomGreeting Service', function () {

  var service;

  beforeEach(function () {
    // Load pre-computed locales to prevent l10n system from lazy-loading them
    localeFixture();

    // Load the module we're testing
    module('rl.helloworld.sayhello.RandomGreeting');

    // Inject our service so we can test it
    inject(function (RandomGreeting) {
      service = RandomGreeting;
    });
  });

  it('should return a greeting', function () {
    // Get a greeting
    var myGreeting = service.get();

    // This is a dumb test
    expect(myGreeting === null).toBe(false);
  });

});