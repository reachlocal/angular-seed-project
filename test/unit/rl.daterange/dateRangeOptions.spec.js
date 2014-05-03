describe("DateRangeOptions", function DateRangeOptions() {
    var options;
    var moment;
    var format = "YYYY-MM-DD";
    var now;

    beforeEach(function injectService() {
        module('rl.daterange');
        inject(function (DateRangeOptions, Moment) {
            moment = Moment.build;
            // Pick a static date so our tests can have manually calculated results
            now = moment("2000-01-15");
            // Monkey-patch moment's init method to freeze time
            // If they're asking for "now", return frozen time
            // Otherwise, return the time the asked for
            Moment.build = function (date) {
                if (!!date) {
                    return moment(date);
                } else {
                    return angular.copy(now);
                }
            };

            options = DateRangeOptions.build(now);
        });
    });

    it("starts with sensible defaults", function () {
        expect(options.customLabel()).toEqual("Custom");
        expect(options.labelPrefix()).toEqual("");
        expect(options.format()).toEqual(format);
        expect(options.anchorDate()).toEqual("2000-01-15");
        expect(options.maxDate()).toEqual("2000-01-15");
        expect(options.defaultRange()).toEqual({ label: "Last 30 Days", from : "1999-12-16", to : "2000-01-15" });
    });
    it("allows a custom anchorDate moment object", function () {
        now.subtract('days', 100);
        options.anchorDate(now);
        expect(options.anchorDate()).toEqual(now.format(format));
    });
    it("allows a custom anchorDate string", function () {
        now.subtract('days', 100);
        options.anchorDate(now.format(format));
        expect(options.anchorDate()).toEqual(now.format(format));
    });
    it("rejects invalid date strings", function () {
        function badMojo() {
            options.anchorDate("Totally Invalid Format");
        }
        expect(badMojo).toThrow(new Error("Date is invalid"));
    });
    it("allows a custom format", function () {
        options.format("YYYY");
        expect(options.format()).toEqual("YYYY");
    });
    it("allows a custom label", function () {
        options.customLabel("WAT?");
        expect(options.customLabel()).toEqual("WAT?");
    });
    it("allows a max date", function () {
        options.maxDate("2012-01-01");
        expect(options.maxDate()).toEqual("2012-01-01");
    });
    it("rejects a bad max date", function () {
        function badMojo() {
            options.maxDate("Totally Invalid Format");
        }
        expect(badMojo).toThrow(new Error("Date is invalid"));
    });
    it("allows a custom label", function () {
        options.customLabel("Foo");
        expect(options.customLabel()).toEqual("Foo");
    });
    it("allows a label prefix", function () {
        options.labelPrefix("PREFIX");
        expect(options.labelPrefix()).toEqual("PREFIX");
        expect(options.ranges()["Last 30 Days"].label).toEqual("PREFIXLast 30 Days");
    });
    it("builds a hash", function () {
        var hash = options.asHash();
        expect(hash.format).toEqual("YYYY-MM-DD");
        expect(hash.anchorDate).toEqual("2000-01-15");
        expect(hash.maxDate).toEqual("2000-01-15");
        expect(hash.customLabel).toEqual("Custom");
        expect(hash.labelPrefix).toEqual("");
        expect(hash.ranges).toBeTruthy();
    });
    describe("generating ranges", function () {
        var ranges;
        beforeEach(function () {
            ranges = options.ranges();
        });
        it("sets the range label", function () {
            var range = ranges['Last 30 Days'];
            expect(range.label).toEqual('Last 30 Days');
        });
        it("builds last 30 days", function () {
            var range = ranges['Last 30 Days'];
            expect(range.to).toEqual("2000-01-15");
            expect(range.from).toEqual("1999-12-16");
        });
        it("builds last 60 days", function () {
            var range = ranges['Last 60 Days'];
            expect(range.to).toEqual("2000-01-15");
            expect(range.from).toEqual("1999-11-16");
        });
        it("builds last 90 days", function () {
            var range = ranges['Last 90 Days'];
            expect(range.to).toEqual("2000-01-15");
            expect(range.from).toEqual("1999-10-17");
        });
        it("builds all time", function () {
            var range = ranges['All Time'];
            expect(range.to).toEqual('');
            expect(range.from).toEqual('');
        });
        it("builds yesterday", function () {
            var range = ranges.Yesterday;
            expect(range.to).toEqual("2000-01-14");
            expect(range.from).toEqual("2000-01-14");
        });
        it("builds last 7 days", function () {
            var range = ranges['Last 7 Days'];
            expect(range.to).toEqual("2000-01-15");
            expect(range.from).toEqual("2000-01-08");
        });
        it("builds this month", function () {
            var range = ranges['This Month'];
            expect(range.from).toEqual("2000-01-01");
            expect(range.to).toEqual("2000-01-31");
        });
        it("builds last month", function () {
            var range = ranges['Last Month'];
            expect(range.from).toEqual("1999-12-01");
            expect(range.to).toEqual("1999-12-31");
        });
    });
});
