describe("Ad Groups", function () {

    var adGroups;

    beforeEach(function () {
        module("rl.cpi.main.services.adGroups");
        inject(function (AdGroups) {
            adGroups = AdGroups;
        });
        httpResolver.beforeEach();
    });

    afterEach(httpResolver.afterEach);


    it("should fetch ad group data", function () {
        var adGroupsData = {
            id: 312,
            name: 'Google'

        };
        httpResolver.$httpBackend.expectGET('/campaigns/123/adGroups').respond(adGroupsData);
        var myAdGroups = adGroups.get({campaignId: '123'});
        httpResolver.resolve();
        expect(myAdGroups.id).toEqual(adGroupsData.id);
    });

});