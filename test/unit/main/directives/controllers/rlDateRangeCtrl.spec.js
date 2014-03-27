describe('RL Date Range Selector', function () {

    var $scope, controller, $state, $location;
    var rootScope;
    var Moment;

    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlDateRange'));

    beforeEach(inject(function($controller, $rootScope, _Moment_, _$location_) {
        $scope = $rootScope.$new();
        rootScope = $rootScope;
        controller = $controller;
        Moment = _Moment_;
        $state = {go: function() {}};
        $location = _$location_;
    }));

    function buildController() {
        controller('rlDateRangeCtrl', {
            $scope: $scope,
            $rootScope: rootScope,
            Moment: Moment,
            $state: $state,
            $location: $location
        });
    }

    describe("when it initializes", function() {
        var mockNow, mock30DaysAgo;
        beforeEach(function() {
            mockNow       = window.moment("2014-03-26");
            mock30DaysAgo = window.moment("2014-02-24");

            spyOn(Moment, 'build').andReturn(mockNow);
            spyOn(mockNow, 'subtract').andReturn(mock30DaysAgo);

            spyOn(mockNow,       'format').andReturn('puppies');
            spyOn(mock30DaysAgo, 'format').andReturn('kittens');
        });
        it("starts with the last 30 days selected", function() {
            buildController();

            expect($scope.from).toEqual('kittens');
            expect($scope.to).toEqual('puppies');

            expect(mockNow.subtract).toHaveBeenCalledWith('days', 30);
        });
        it("broadcasts a range updated event with the default range object", function() {
            var range = { from: mock30DaysAgo, to: mockNow };
            spyOn(rootScope, '$broadcast');

            buildController();

            expect(rootScope.$broadcast).toHaveBeenCalledWith('rl:dateRange:updated', range);
        });
    });

    describe("when either from or to gets updated", function() {
        beforeEach(function () {
            buildController();
            $scope.$digest();
        });
        it("a rl:dateRange:updated event is broadcast", function() {
            var mockEndOfTheWorld = window.moment('2012-12-21');
            var mockChristmas     = window.moment('2012-12-25');
            var expectedRange = { from: mockEndOfTheWorld, to: mockChristmas };

            $scope.from = '2012-12-21';
            $scope.$digest();

            $scope.to   = '2012-12-25';
            rootScope.$on('rl:dateRange:updated', function(event, range) {
                expect(range.to.toString()).toEqual(expectedRange.to.toString());
                expect(range.from.toString()).toEqual(expectedRange.from.toString());
            });
            $scope.$digest();
        });
    });
});
