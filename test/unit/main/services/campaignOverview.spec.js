describe("CampaignOverview", function () {

    var campaignOverview;

    beforeEach(mockDependency('rl.cpi.main.config', 'Config').toBe({gatewayBaseUrl: ''}));

    beforeEach(function () {
        module("rl.cpi.main.services.campaignOverview");
        inject(function (CampaignOverview) {
            campaignOverview = CampaignOverview;
        });
        httpResolver.beforeEach();
    });

    afterEach(httpResolver.afterEach);


    it("should fetch overview data for a given campaign", function () {
      var overviewData = {
        id: 1,
        name: "A Quality 1st Plumbing- Plumbing",
      }
      httpResolver.$httpBackend.expectGET('/campaigns/1/overview_data').respond(overviewData);

      var result = campaignOverview.get({ campaignId: 1})

      httpResolver.resolve();

      expect(result.id).toEqual(overviewData.id);
      expect(result.name).toEqual(overviewData.name);

    });

});
