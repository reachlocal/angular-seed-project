describe('Zippable factory', function() {

    var service;

    beforeEach(function () {
        localeFixture();
        module("rl.cpi.main.services.Zippable");
        inject(function (Zippable) {
            factory = Zippable;
        });
    });

    var summaries = [], reports = [];

    beforeEach(function() {
        summaries[0] = { id: 123, title: 'Puppies' };
        summaries[1] = { id: 456, title: 'Kittens' };
        summaries[2] = { id: 789, title: 'Bunnies' };
        summaries[3] = { id: 999, title: 'Ponneys' };

        reports[0] = { summaryId: 789, count: 1 };
        reports[1] = { summaryId: 456, count: 2 };
        reports[2] = { summaryId: 123, count: 3 };
    });

    describe("zippable objects", function() {
        var zippable;
        beforeEach(function() {
            zippable = factory.build(summaries, 'id', 'summary');
        });
        it("return entry that has a certain key", function() {
            expect(zippable.byKey(123)).toBe(summaries[0]);
        });
        it("modified source objects are still accessible", function() {
            var newValue = { abc: 123 };
            summaries[0].foo = newValue;
            expect(zippable.byKey(123).foo).toBe(newValue);
        });
    });

    describe("a zipped collection of collections", function() {
        var s, r, zipped;
        beforeEach(function() {
            s = factory.build(summaries, 'id', 'summary');
            r = factory.build(reports, 'summaryId', 'report');
            zipped = s.zip(r);
        });
        it("entry on the result has references for both original collections", function() {
            expect(zipped[0].summary).toBe(summaries[0]);
            expect(zipped[0].report).toBe(reports[2]);
        });
        it("marks right-side as undefined when no match is found", function() {
            expect(zipped[3].report).toBe(null);
        });
        it('keeps the order of the left hand object', function() {
            expect(zipped[0].summary).toBe(summaries[0]);
            expect(zipped[1].summary).toBe(summaries[1]);
            expect(zipped[2].summary).toBe(summaries[2]);
            expect(zipped[3].summary).toBe(summaries[3]);
        });
    });

    describe("input validation", function() {
        it("raises if there are two entries with same key", function() {
            summaries[1].id = summaries[0].id;
            expect(function() {
                factory.build(summaries, 'id', 'summary');
            }).toThrow("Your input collection 'summary' has duplicate keys");

        });
    });

});

