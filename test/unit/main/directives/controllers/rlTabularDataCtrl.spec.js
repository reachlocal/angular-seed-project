describe('Creative table controller', function () {
    var $scope;
    var mocks = {
        zippable: { build: angular.noop },
        creative: { zip: angular.noop },
        report: { }
    };

    // Load the template cache, it's in the 'rl' module
    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlTabularData'));

    it("builds the table when reports are updated", function() {
        spyOn(mocks.zippable, 'build').andCallFake(function(c, k, n) {
            return mocks[n];
        });
        spyOn(mocks.creative, 'zip');

        inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $scope.creatives = [];
            $scope.reports = [];
            $controller('rlTabularDataCtrl', { $scope: $scope, Zippable: mocks.zippable });
        });

        $scope.creatives = [];
        $scope.reports = [];
        $scope.$digest();

        expect(mocks.zippable.build).toHaveBeenCalledWith($scope.creatives, 'id', 'creative');
        expect(mocks.zippable.build).toHaveBeenCalledWith($scope.reports, 'textCreativeId', 'report');
        expect(mocks.creative.zip).toHaveBeenCalledWith(mocks.report);
        // $scope.table should be assigned to the return value of creative.zip (a spy)
        // This is not awesome...  :(
        expect($scope.table.zip).toEqual(mocks.creative.zip);
    });
});


