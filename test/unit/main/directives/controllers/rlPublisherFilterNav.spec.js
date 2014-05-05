describe('Publisher filter nav controller', function () {
    var $scope;
    var buildMock = function() {
      return {
        labelPrefix: angular.noop
      };
    };
    var mocks = {
        publisherFilterService: { load: angular.noop },
        dateRangeOptions: { build: buildMock },
        queryParams: { }
    };

    beforeEach(module('rl.cpi.main.directives.rlPublisherFilterNav'));

    describe('staged changes', function() {
      it('counts the number of staged creatives', function() {
        inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('rlPublisherFilterNavCtrl', { $scope: $scope,
                                                  PublisherFilterService: mocks.publisherFilterService,
                                                  DateRangeOptions: mocks.dateRangeOptions,
                                                  QueryParams: mocks.queryParams });
        });

        $scope.creatives = [
          { staged: true  },
          { staged: true  },
          { staged: false },
          { staged: false },
          { staged: false }
        ];

        expect($scope.countStagedChanges()).toEqual(2);
      });
    });
});

