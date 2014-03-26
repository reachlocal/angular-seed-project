describe("Recommendations Model", function () {
    var factory;

    beforeEach(function () {
        module("rl.cpi.main.services.Recommendations");
        inject(function(RecommendationsModel) {
            factory = RecommendationsModel;
        });
    });

    describe("build", function() {
        var model = null;

        it("should expose items", function() {
            model = factory.build([ 1,2,3 ]);
            expect(model.items).toEqual([1,2,3]);
        });
        it("counts number of recommendations", function() {
            model = factory.build([8,9,10,11]);
            expect(model.count()).toBe(4);
        });

        var items_empty = [];
        var items_single = [ {} ];
        var items_multiple = [ {}, {}, {} ];

        describe("empty item list", function() {
            beforeEach(function() {
                model = factory.build(items_empty);
            });

            it("has no active recommendations", function() {
                expect(model.hasActiveRecommendations()).toBe(false);
            });
        });

        describe("single item list", function() {
            beforeEach(function() {
                model = factory.build(items_single);
            });

            it("has active recommendations", function() {
                expect(model.hasActiveRecommendations()).toBe(true);
            });
        });

    });

});
