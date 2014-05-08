describe("PublisherTextCreativeRules", function () {

  var service;
  var rules = [
    {
      publisherId: 1,
      publisherName: "Google"
    },
    {
      publisherId: 2,
      publisherName: "Bing"
    }
  ];

  beforeEach(mockDependency('rl.cpi.main.Config', 'Config').toBe({gatewayBaseUrl: ''}));
  beforeEach(function () {
    localeFixture();
    module("rl.cpi.main.services.PublisherTextCreativeRules");
    inject(function (PublisherTextCreativeRules) {
      service = PublisherTextCreativeRules;
    });
    httpResolver.beforeEach();
  });

  afterEach(httpResolver.afterEach);

  it("fetches rules as a hash", function () {
    httpResolver.$httpBackend.expectGET('/publisher-text-creative-rules').respond(JSON.stringify(rules));

    var allRules = service.asHash();
    httpResolver.resolve();

    expect(allRules['1'].publisherId).toEqual(rules[0].publisherId);
    expect(allRules['2'].publisherName).toEqual(rules[1].publisherName);
  });

  it("fetches rules as an array", function () {
    httpResolver.$httpBackend.expectGET('/publisher-text-creative-rules').respond(JSON.stringify(rules));

    var allRules = service.query();
    httpResolver.resolve();

    expect(allRules[0].publisherId).toEqual(rules[0].publisherId);
    expect(allRules[1].publisherName).toEqual(rules[1].publisherName);
  });

});