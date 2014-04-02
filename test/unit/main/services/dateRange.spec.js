describe('Date Range Service', function () {

    var $state, $location;
    var $rootScope;
    var Moment;
    var service;

    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.services.DateRange'));

    beforeEach(inject(function(_$rootScope_, _Moment_, _$location_, _$state_) {
        $rootScope = _$rootScope_;
        Moment = _Moment_;
        $state = _$state_;
        spyOn($state, 'go').andReturn();
        $location = _$location_;
    }));

    function buildService() {
        inject(function(DateRange) {
            service = DateRange;
        });
    }

    describe("when it initializes", function() {
        var mockNow, mock30DaysAgo;
        beforeEach(function() {
            mockNow       = window.moment("2014-03-26");
            mock30DaysAgo = window.moment("2014-02-24");

            spyOn(Moment, 'build').andReturn(mockNow);
            spyOn(mockNow, 'subtract').andReturn(mock30DaysAgo);
        });
        it("starts with the last 30 days selected", function() {
            buildService();

            expect(service.from()).toEqual(mock30DaysAgo);
            expect(service.to()).toEqual(mockNow);

            expect(mockNow.subtract).toHaveBeenCalledWith('days', 30);
        });
        it("broadcasts a range updated event with the default range object", function() {
            var range = { from: mock30DaysAgo, to: mockNow };
            spyOn($rootScope, '$broadcast');

            buildService();

            expect($rootScope.$broadcast).toHaveBeenCalledWith('rl:dateRange:updated', range);
        });
    });

    describe("when either from or to gets updated", function() {
        var mockEaster, mockChristmas;

        beforeEach(function() {
            mockEaster    = window.moment("2013-03-13");
            mockChristmas = window.moment('2012-12-25');
            buildService();
        });
        it("a rl:dateRange:updated event is broadcast", function() {
            spyOn($rootScope, '$broadcast');

            service.from(mockChristmas);

            var actualRange = $rootScope.$broadcast.mostRecentCall.args[1];
            expect(actualRange.from.format('YYYY-MM-DD')).toEqual('2012-12-25');

            service.to(mockEaster);

            actualRange = $rootScope.$broadcast.mostRecentCall.args[1];
            expect(actualRange.to.format('YYYY-MM-DD')).toEqual('2013-03-13');
        });

        it("if dates did not change, do not broadcast", function() {
            spyOn($rootScope, '$broadcast');

            service.from(service.from());
            service.to(service.to());

            expect($rootScope.$broadcast).not.toHaveBeenCalled();
        });

        it("updates the querystring with the new date range", function() {
            spyOn($location, 'search');

            service.from(mockChristmas);
            service.to(mockEaster);

            expect($location.search).toHaveBeenCalledWith('dateFrom', '2012-12-25');
            expect($location.search).toHaveBeenCalledWith('dateTo',   '2013-03-13');
            expect($state.go).toHaveBeenCalled();
        });
        it("accepts string-formatted dates", function() {
            service.from('2012-09-09');
            expect(service.from().format('YYYY-MM-DD')).toEqual('2012-09-09');
            service.to('2012-09-10');
            expect(service.to().format('YYYY-MM-DD')).toEqual('2012-09-10');
        });
    });

    describe("when the query string already has dates on it",function() {
        beforeEach(function() {
            $location.search("dateFrom", '2012-03-13');
            $location.search("dateTo",   '2012-12-25');
        });
        it("sets the range to the dates queried", function() {
            mockEaster    = window.moment("2012-03-13");
            mockChristmas = window.moment('2012-12-25');

            buildService();

            expect(service.from().toString()).toEqual(mockEaster.toString());
            expect(service.to().toString()).toEqual(mockChristmas.toString());
        });
    });
});
