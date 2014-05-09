describe("Recommendations", function () {

  var recommendations;

  var recommendation1 = {
    id: 4567,
    type: "simple_dismiss",
    title: "Add 2 more keywords",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo risus volutpat venenatis vehicula."
  };
  var recommendation2 = {
    id: 7899,
    type: "simple_dismiss",
    title: "Create more moon wells",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo risus volutpat venenatis vehicula."
  };

  var payload = [ recommendation1, recommendation2 ];

  beforeEach(mockDependency('rl.cpi.main.Config', 'Config').toBe({gatewayBaseUrl: ''}));

  beforeEach(function () {
    localeFixture();
    module("rl.cpi.main.services.Recommendations");
    inject(function (Recommendations) {
      recommendations = Recommendations;
    });
    httpResolver.beforeEach();
  });

  afterEach(httpResolver.afterEach);

  it("fetches recommendations for a given campaign", function () {
    httpResolver.$httpBackend.expectGET('/campaigns/1/recommendations').respond(payload);

    var queryPromise = recommendations.query({ campaignId: 1 });

    httpResolver.resolve();

    queryPromise.then(function (result) {
      expect(result.items.length).toBe(2);
      expect(result.items[0].id).toEqual(4567);
      expect(result.items[0].type).toEqual("simple_dismiss");
      expect(result.items[0].title).toEqual("Add 2 more keywords");
      expect(result.items[0].description).toEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo risus volutpat venenatis vehicula.");
    });
  });


});
