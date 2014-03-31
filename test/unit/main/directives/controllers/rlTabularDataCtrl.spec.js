describe('Creative table controller', function () {
    var $scope;
    var mocks = {
        zippable: { build: null },
        creative: { zip: null },
        report: { }
    };

    // Load the template cache, it's in the 'rl' module
    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlTabularData'));

    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('rlTabularDataCtrl', { $scope: $scope, Zippable: mocks.zippable });
    }));


    it("builds the table when creatives are updated", function() {
        spyOn(mocks.zippable, 'build').andCallFake(function(c,k,n) { return mocks[n]; });
        spyOn(mocks.creative, 'zip').andReturn('foo');

        $scope.creatives = [];
        $scope.reports = [];
        $scope.$digest();

        expect(mocks.zippable.build).toHaveBeenCalledWith($scope.creatives, 'id', 'creative');
        expect(mocks.zippable.build).toHaveBeenCalledWith($scope.reports, 'textCreativeId', 'report');
        expect(mocks.creative.zip).toHaveBeenCalledWith(mocks.report);
        expect($scope.table).toEqual('foo');
    });
    it("builds the table when reports are updated");
});


