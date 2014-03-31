describe('Creatives Service', function() {

    var service;

    beforeEach(mockDependency('rl.cpi.main.Config', 'Config').toBe({gatewayBaseUrl: ''}));

    beforeEach(function () {
        localeFixture();
        module("rl.cpi.main.services.Creatives");
        inject(function (Creatives) {
            service = Creatives;
        });
        httpResolver.beforeEach();
    });

    afterEach(httpResolver.afterEach);

    it('should fetch creatives from gateway', function () {
        var creatives = [
            { headLines: "Blah" },
        ];
        httpResolver.$httpBackend.expectGET('/campaigns/1/text_creatives').respond(creatives);

        var result = service.query({campaignId: 1});
        httpResolver.resolve();

        expect(result[0].headLines).toEqual("Blah");
    });

});
