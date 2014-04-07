describe('RL Date Range Selector', function () {

    var $scope, controller, service;
    var rootScope;
    var Moment;

    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlDateRange'));

    beforeEach(inject(function($controller, $rootScope, _Moment_) {
        $scope = $rootScope.$new();
        rootScope = $rootScope;
        controller = $controller;
        Moment = _Moment_;

        var dummy = function() {
            return window.moment();
        };
        service = { from: dummy, to: dummy };
    }));

    function buildController() {
        controller('rlDateRangeCtrl', {
            $scope: $scope,
            $rootScope: rootScope,
            Moment: Moment,
            DateRange: service
        });
    }

    describe("when it initializes", function() {
        it("gets its date from DateRange", function() {
            var mockEndOfTheWorld = window.moment('2012-12-21');
            var mockChristmas     = window.moment('2012-12-25');
            spyOn(service, 'to').andReturn(mockChristmas);
            spyOn(service, 'from').andReturn(mockEndOfTheWorld);

            buildController();

            expect($scope.to).toEqual('Dec, 25 2012');
            expect($scope.from).toEqual('Dec, 21 2012');

            expect(service.to).toHaveBeenCalled();
            expect(service.from).toHaveBeenCalled();

        });
    });

    describe("when either from or to gets updated", function() {
        beforeEach(function () {
            buildController();

            spyOn(service, 'from');
            spyOn(service, 'to');
        });
        it("a rl:dateRange:updated event is broadcast", function() {
            $scope.from = '2012-12-21';
            $scope.to   = '2012-12-25';
            $scope.$digest();

            expect(service.from).toHaveBeenCalledWith('2012-12-21');
            expect(service.to).toHaveBeenCalledWith('2012-12-25');
        });
    });
});
