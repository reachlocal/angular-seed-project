describe("ResourceWithModel", function () {
    var resource, listModel, itemModel, subject, response;

    var thing1 = { oneProperty: 'one' };
    var thing2 = { oneProperty: 'two' };
    var things = [ thing1, thing2 ];

    beforeEach(function () {
        localeFixture();
        module("rl.cpi.main.services.ResourceWithModel");
        inject(function (ResourceWithModel, $resource) {
            service = ResourceWithModel;
            resource = $resource('/thing/:id');
        });
        httpResolver.beforeEach();
    });

    afterEach(httpResolver.afterEach);

    beforeEach(function() {
        listModel = { build: function(resource) { resource.listProperty = 'list'; return resource; } };
        itemModel = { build: function(resource) { resource.itemProperty = 'item'; return resource; } };

        subject = service(resource, listModel, itemModel);

        spyOn(resource, 'query').andCallThrough();
        spyOn(resource, 'get').andCallThrough();
        spyOn(resource, 'save').andCallThrough();
        spyOn(resource, 'remove').andCallThrough();
        spyOn(resource, 'delete').andCallThrough();
    });

    it('wraps the response of query in a promise that wraps the resource with list model', function() {
        httpResolver.$httpBackend.expectGET('/thing').respond(things);

        subject.query({}).then(function(result) {
            expect(resource.query).toHaveBeenCalledWith({});

            expect(result[0].oneProperty).toEqual('one');
            expect(result[1].oneProperty).toEqual('two');

            expect(result.listProperty).toEqual('list');
        });
        httpResolver.resolve();
    });

    it('wraps the response of a get in a promise that wraps the resource with list model', function() {
        httpResolver.$httpBackend.expectGET('/thing/1').respond(thing1);

        subject.get({id: 1}).then(function(result) {
            expect(resource.get).toHaveBeenCalledWith({id: 1});
            expect(result.oneProperty).toEqual('one');
            expect(result.itemProperty).toEqual('item');
        });
        httpResolver.resolve();
    });

    it('wraps the response of a save in a promise but does not wrap it with a model', function() {
        var newThing = { oneProperty: 'three' };
        httpResolver.$httpBackend.expectPOST('/thing').respond(newThing);

        subject.save(newThing).then(function(result) {
            expect(resource.save).toHaveBeenCalledWith(newThing);
            expect(result.oneProperty).toEqual('three');
        });
        httpResolver.resolve();
    });

    it('wraps the response of a remove in a promise but does not wrap it with any model', function() {
        httpResolver.$httpBackend.expectDELETE('/thing/2').respond();

        subject.remove({ id: 2 }).then(function(result) {
            expect(resource.remove).toHaveBeenCalledWith({ id: 2 });
        });
        httpResolver.resolve();
    });

    it('wraps the response of a delete in a promise but does not wrap it with any model', function() {
        httpResolver.$httpBackend.expectDELETE('/thing/2').respond();

        subject.delete({ id: 2 }).then(function(result) {
            expect(resource.delete).toHaveBeenCalledWith({ id: 2 });
        });
        httpResolver.resolve();
    });
});
