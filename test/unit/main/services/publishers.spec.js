describe("Publishers", function () {

    var publishers;

    beforeEach(mockDependency('rl.cpi.main.Config', 'Config').toBe({gatewayBaseUrl: ''}));

    beforeEach(function () {
        module("rl.cpi.main.services.Publishers");
        inject(function (Publishers) {
            publishers = Publishers;
        });
        httpResolver.beforeEach();
    });

    afterEach(httpResolver.afterEach);


    it("should fetch ad group data", function () {
        var publishersData = [{
            id: 312,
            name: 'Google'
        }];
        httpResolver.$httpBackend.expectGET('/campaigns/1234/web_publisher_campaigns').respond(publishersData);
        var myPublishers = publishers.query({ campaignId: 1234 });
        httpResolver.resolve();
        expect(myPublishers[0].id).toEqual(publishersData[0].id);
    });

});