describe("Publishers", function () {

    var publishers;

    beforeEach(mockDependency('rl.cpi.main.config', 'Config').toBe({gatewayBaseUrl: ''}));

    beforeEach(function () {
        module("rl.cpi.main.services.publishers");
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
        httpResolver.$httpBackend.expectGET('/publishers').respond(publishersData);
        var myPublishers = publishers.query();
        httpResolver.resolve();
        expect(myPublishers[0].id).toEqual(publishersData[0].id);
    });

});