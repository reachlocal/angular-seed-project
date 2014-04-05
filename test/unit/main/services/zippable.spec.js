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
        var zipped;
        beforeEach(function() {
            zipped = factory.build(summaries, 'id', 'summary');
        });
        it("return entry that has a certain key", function() {
            expect(zipped.byKey(123).summary).toBe(summaries[0]);
        });
        it("modified source objects are still accessible", function() {
            var newValue = { abc: 123 };
            summaries[0].foo = newValue;
            expect(zipped.byKey(123).summary.foo).toBe(newValue);
        });
    });

    describe("a zipped collection of collections", function() {
        var zippedSummaries, zippedReports;
        beforeEach(function() {
            zippedSummaries = factory.build(summaries, 'id', 'summary');
            zippedReports   = factory.build(reports, 'summaryId', 'report');
            zippedSummaries.zip(zippedReports);
        });
        it("entry on the result has references for both original collections", function() {
            expect(zippedSummaries[0].summary).toBe(summaries[0]);
            expect(zippedSummaries[0].report).toBe(reports[2]);
        });
        it("marks right-side as undefined when no match is found", function() {
            expect(zippedSummaries[3].report).toBe(null);
        });
        it('keeps the order of the left hand object', function() {
            expect(zippedSummaries[0].summary).toBe(summaries[0]);
            expect(zippedSummaries[1].summary).toBe(summaries[1]);
            expect(zippedSummaries[2].summary).toBe(summaries[2]);
            expect(zippedSummaries[3].summary).toBe(summaries[3]);
        });
        it("re-zipping overwrites only the relevant sub-entry", function() {
            var newReports = [ { 'summaryId': 123, count: 15 } ];
            var zippedNewReports = factory.build(newReports, 'summaryId', 'report');

            zippedSummaries.zip(zippedNewReports);

            expect(zippedSummaries.byKey(123).summary).toBe(summaries[0]);
            expect(zippedSummaries.byKey(456).summary).toBe(summaries[1]);
            expect(zippedSummaries.byKey(789).summary).toBe(summaries[2]);
            expect(zippedSummaries.byKey(999).summary).toBe(summaries[3]);

            expect(zippedSummaries.byKey(123).report).toBe(newReports[0]);
            expect(zippedSummaries.byKey(456).report).toBe(null);
            expect(zippedSummaries.byKey(789).report).toBe(null);
            expect(zippedSummaries.byKey(999).report).toBe(null);
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

