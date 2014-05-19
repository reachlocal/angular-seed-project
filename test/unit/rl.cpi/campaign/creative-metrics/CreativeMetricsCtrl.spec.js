describe('Creative table controller', function () {
  var $scope;
  var mocks = {
    zippable: { build: angular.noop },
    creative: { zip: angular.noop },
    creatives: [],
    report: { }
  };

  // Load the template cache, it's in the 'rl' module
  beforeEach(localeFixture);
  beforeEach(module('rl.cpi.campaign'));

  it('builds the table when reports are updated', function () {
    spyOn(mocks.zippable, 'build').andCallFake(function (c, k, n) {
      return mocks[n];
    });
    spyOn(mocks.creative, 'zip');

    inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      $scope.reports = [];
      $controller('CreativeMetricsCtrl', { $scope: $scope, creatives: mocks.creatives, Zippable: mocks.zippable });
    });

    $scope.reports = [];
    $scope.$digest();

    expect(mocks.zippable.build).toHaveBeenCalledWith($scope.creatives, 'id', 'creative');
    expect(mocks.zippable.build).toHaveBeenCalledWith($scope.reports, 'creativeId', 'report');
    expect(mocks.creative.zip).toHaveBeenCalledWith(mocks.report);
    // $scope.table should be assigned to the return value of creative.zip (a spy)
    // This is not awesome...  :(
    expect($scope.table.zip).toEqual(mocks.creative.zip);
  });
});


