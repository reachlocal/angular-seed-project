describe('RL Creative Card Editor', function () {

  var $scope, controller;
  var rootScope;
  var rulesServiceMock, ruleSetMock;

  beforeEach(localeFixture);
  beforeEach(module('rl.cpi'));
  beforeEach(module('rl.cpi.campaignNewCreative'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    $scope.campaign = { currentCampaignId: 1234 };
    rootScope = $rootScope;
    controller = $controller;

    ruleSetMock      = { forPublisherId: null, defaultRule: null };
    rulesServiceMock = { allByCampaignId: null };
    spyOn(rulesServiceMock, 'allByCampaignId').andReturn(ruleSetMock);
    spyOn(ruleSetMock, 'forPublisherId').andReturn('publisher rule set');
    spyOn(ruleSetMock, 'defaultRule').andReturn('default rule set');

  }));

  function buildController() {
    controller('rlCreativeCardCtrl', {
      $scope: $scope,
      PublisherTextCreativeRules: rulesServiceMock
    });
    $scope.$digest();
  }

  describe('is the master creative', function () {
    it('uses the given ngModel', function () {
      $scope.ngModel = {
        headLine: 'a headline',
        descriptiveLine: [ 'one line', 'other line' ]
      };

      buildController();

      expect($scope.creative.headLine).toBe('a headline');
      expect($scope.creative.descriptiveLine[0]).toBe('one line');
      expect($scope.creative.descriptiveLine[1]).toBe('other line');

    });
  });

  describe('is based on a master creative', function () {
    var masterCreative;
    beforeEach(function () {
      $scope.linkedTo = masterCreative = {
        headLine: 'a headline',
        descriptiveLine: [ 'one line', 'other line' ]
      };
      buildController();
      $scope.$digest();
    });

    it('synchronizes values with master', function () {
      expect($scope.creative.headLine).toBe('a headline');
      expect($scope.creative.descriptiveLine[0]).toBe('one line');
      expect($scope.creative.descriptiveLine[1]).toBe('other line');
      expect($scope.isLinked).toBe(true);
    });

    it('user explicitly link creative again', function () {
      $scope.creative.headLine = 'a different headline';
      $scope.$digest();

      $scope.link();
      masterCreative.headLine = 'yet another headline';
      $scope.$digest();

      expect($scope.creative.headLine).toBe('yet another headline');
      expect($scope.isLinked).toBe(true);
    });

    it('user explicitly unlinks creative', function () {
      $scope.unlink();

      masterCreative.headLine = 'a different headline';
      $scope.$digest();

      expect($scope.creative.headLine).toBe('a headline');
      expect($scope.isLinked).toBe(false);
    });
  });

  describe('ruleset selection', function() {
    it('uses default rule when there is no publisher', function() {
      $scope.publisher = null;

      buildController();

      expect(ruleSetMock.defaultRule).toHaveBeenCalled();
      expect($scope.rules).toEqual('default rule set');
    });

    it('uses publisher specific ruleset', function() {
      $scope.publisher = { publisherId: 789 };

      buildController();

      expect(ruleSetMock.forPublisherId).toHaveBeenCalledWith(789);
      expect($scope.rules).toEqual('publisher rule set');
    });
  });
});
