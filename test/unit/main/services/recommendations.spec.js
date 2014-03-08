describe("Recommendations", function () {

    var recommendations;

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

    it("should fetch recommendations for a given campaign", function () {
        var recommendations_payload = [
            {
                id: 4567,
                type: "simple_dismiss",
                title: "Add 2 more keywords",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo risus volutpat venenatis vehicula."
            }
        ];

        httpResolver.$httpBackend.expectGET('/campaigns/1/recommendations').respond(recommendations_payload);

        var results = recommendations.query({ campaignId: 1 });

        httpResolver.resolve();

        expect(results[0].id).toEqual(recommendations_payload[0].id);
        expect(results[0].type).toEqual(recommendations_payload[0].type);
        expect(results[0].title).toEqual(recommendations_payload[0].title);
        expect(results[0].description).toEqual(recommendations_payload[0].description);

    });

});
