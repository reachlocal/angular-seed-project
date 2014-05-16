describe('Publisher filter nav controller', function () {
  var $scope;
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
    module('rl.cpi.campaign');
    module('rl.cpi.main.services.Creatives');
  });

  describe('staged changes', function () {
    it('counts the number of staged creatives', function () {
      inject(function ($controller, $rootScope, Creatives) {
        $controller('FiltersCtrl', {
          creatives: [
            new Creatives({ status: 'STAGED' }),
            new Creatives({ status: 'STAGED' }),
            new Creatives({ status: 'RUNNING' }),
            new Creatives({ status: 'PAUSED' }),
            new Creatives({ status: 'NEW' })
          ],
          $scope: $scope = $rootScope.$new(),
          PublisherFilterService: mocks.publisherFilterService,
          DateRangeOptions: mocks.dateRangeOptions,
          QueryParams: mocks.queryParams
        });
      });

      expect($scope.countStagedChanges()).toEqual(2);
    });
  });
});

