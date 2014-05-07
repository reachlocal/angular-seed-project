describe("PublisherTextCreativeRules", function () {

  var service;
  var rules = [
    {
      id: 1,
      name: "Google"
    },
    {
      id: 2,
      name: "Bing"
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

    expect(allRules['1'].id).toEqual(rules[0].id);
    expect(allRules['2'].name).toEqual(rules[1].name);
  });

  it("fetches rules as an array", function () {
    httpResolver.$httpBackend.expectGET('/publisher-text-creative-rules').respond(JSON.stringify(rules));

    var allRules = service.query();
    httpResolver.resolve();

    expect(allRules[0].id).toEqual(rules[0].id);
    expect(allRules[1].name).toEqual(rules[1].name);
  });

});