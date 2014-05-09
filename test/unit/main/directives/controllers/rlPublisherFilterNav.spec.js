describe('Publisher filter nav controller', function () {
  var $scope;
  var Creative;
  var buildMock = function () {
    return {
      labelPrefix: angular.noop
    };
  };
  var mocks = {
    publisherFilterService: { load: angular.noop },
    dateRangeOptions: { build: buildMock },
    queryParams: { }
  };

  beforeEach(function () {
    module('rl.cpi.main.directives.rlPublisherFilterNav');
    module('rl.cpi.main.services.Creatives');
  });

  describe('staged changes', function () {
    it('counts the number of staged creatives', function () {
      inject(function ($controller, $rootScope, _Creatives_) {
        $scope = $rootScope.$new();
        Creative = _Creatives_;
        $controller('rlPublisherFilterNavCtrl', { $scope: $scope,
          PublisherFilterService: mocks.publisherFilterService,
          DateRangeOptions: mocks.dateRangeOptions,
          QueryParams: mocks.queryParams });
      });

      $scope.creatives = [
        new Creative({ status: 'STAGED' }),
        new Creative({ status: 'STAGED' }),
        new Creative({ status: 'RUNNING' }),
        new Creative({ status: 'PAUSED' }),
        new Creative({ status: 'NEW' })
      ];

      expect($scope.countStagedChanges()).toEqual(2);
    });
  });
});

