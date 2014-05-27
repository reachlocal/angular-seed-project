describe('StagedChangesCtrl', function() {
  var $q;
  var $scope;
  var stagedChange;
  var PublishedTextCreativesService;

  beforeEach(module('rl.cpi.campaignStagedChanges'));
  beforeEach(inject(function ($controller, $rootScope, Creatives, _$q_) {
    $q = _$q_;
    $controller('StagedChangesCtrl', {
      $scope: $scope = $rootScope.$new(),
      PublishedTextCreativesService: PublishedTextCreativesService = { publish: angular.noop },
      creatives: [
        stagedChange = new Creatives({ status: 'STAGED', self: 'http://luboviko' }),
        new Creatives({ status: 'PAUSED' })
      ]
    });
  }));

  it('filters only staged text creatives', function () {
    expect($scope.stagedTextCreatives.length).toEqual(1);
    expect($scope.stagedTextCreatives[0].status).toEqual('STAGED');
  });

  describe('removing a staged change', function() {
    it('removes the given staged change from the list of staged changes', function() {
      $scope.remove(stagedChange);
      expect($scope.stagedTextCreatives.length).toEqual(0);
    });

    it('adds the given staged change back to the list when it fails to remove', function () {
      var defer;
      spyOn(stagedChange, '$remove').andCallFake(function () {
        defer = $q.defer();
        return defer.promise;
      });
      $scope.remove(stagedChange);

      defer.reject();
      $scope.$digest();

      expect($scope.stagedTextCreatives.length).toEqual(1);
    });
  });

  describe('publishing staged changes', function() {
    beforeEach(function () {
      $scope.campaign = { currentCampaignId: 1234 };
    });

    it('publishes all existing staged changes', function () {
      spyOn(PublishedTextCreativesService, 'publish').andReturn({ then: angular.noop });
      $scope.publish();
      expect(PublishedTextCreativesService.publish).toHaveBeenCalledWith(1234, [ 'http://luboviko' ]);
    });

    it('returns to the previous page on success', function () {
      spyOn(history, 'back');
      var defer;
      PublishedTextCreativesService.publish = function () {
        defer = $q.defer();
        return defer.promise;
      };

      $scope.publish();
      defer.resolve();
      $scope.$digest();
      expect(history.back).toHaveBeenCalled();
    });
  });

});