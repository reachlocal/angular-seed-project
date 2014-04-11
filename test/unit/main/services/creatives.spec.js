describe('Creatives Service', function() {
    var creative1 = {
        headLines: 'Blah',
        descriptiveLines: [ 'Yadda yadda', 'et cetera' ]
    }
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
        httpResolver.$httpBackend.expectGET('/campaigns/1/text_creatives').respond([ creative1 ]);

        var result = service.query({campaignId: 1});
        httpResolver.resolve();

        expect(result[0].headLines).toEqual("Blah");
    });

    it('creates new creatives on gateway', function() {
        httpResolver.$httpBackend.expectPOST('/campaigns/1/text_creatives').respond(creative1);

        var result = new service(creative1);
        result.campaignId = 1;
        result.$save();
        httpResolver.resolve();

        expect(result.headLines).toEqual('Blah');
    });

});
