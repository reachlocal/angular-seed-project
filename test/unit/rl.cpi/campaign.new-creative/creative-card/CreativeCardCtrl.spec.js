describe('RL Creative Card Editor', function () {

  var $scope, controller;
  var rootScope;
  var rulesServiceMock, ruleSetMock, rulesMock;

  beforeEach(localeFixture);
  beforeEach(module('rl.cpi'));
  beforeEach(module('rl.cpi.campaignNewCreative'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    $scope.campaign = { currentCampaignId: 1234 };
    rootScope = $rootScope;
    controller = $controller;

    rulesMock        = { descriptiveLines: [], headLines: [] };
    ruleSetMock      = { forPublisherId: null, defaultRule: null };
    rulesServiceMock = { allByCampaignId: null };
    spyOn(rulesServiceMock, 'allByCampaignId').andReturn(ruleSetMock);
    spyOn(ruleSetMock, 'forPublisherId').andReturn(rulesMock);
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
        headLines: ['a headline'],
        descriptiveLines: [ 'one line', 'other line' ]
      };

      buildController();

      expect($scope.creative.headLines[0]).toBe('a headline');
      expect($scope.creative.descriptiveLines[0]).toBe('one line');
      expect($scope.creative.descriptiveLines[1]).toBe('other line');

    });
  });

  describe('is based on a master creative', function () {
    var masterCreative;
    beforeEach(function () {
      $scope.linkedTo = masterCreative = {
        headLines: ['a headline'],
        descriptiveLines: [ 'one line', 'other line' ]
      };
      buildController();
      $scope.$digest();
    });

    it('synchronizes values with master', function () {
      expect($scope.creative.headLines[0]).toBe('a headline');
      expect($scope.creative.descriptiveLines[0]).toBe('one line');
      expect($scope.creative.descriptiveLines[1]).toBe('other line');
      expect($scope.isLinked).toBe(true);
    });

    it('user explicitly link creative again', function () {
      $scope.creative.headLines[0] = 'a different headline';
      $scope.$digest();

      $scope.link();
      masterCreative.headLines[0] = 'yet another headline';
      $scope.$digest();

      expect($scope.creative.headLines[0]).toBe('yet another headline');
      expect($scope.isLinked).toBe(true);
    });

    it('user explicitly unlinks creative', function () {
      $scope.unlink();

      masterCreative.headLines[0] = 'a different headline';
      $scope.$digest();

      expect($scope.creative.headLines[0]).toBe('a headline');
      expect($scope.isLinked).toBe(false);
    });
  });

  describe('ruleset selection', function () {
    beforeEach(function () {
      $scope.publisher = { publisherId: 789 };
    });

    it('uses publisher specific ruleset', function () {
      buildController();

      expect(ruleSetMock.forPublisherId).toHaveBeenCalledWith(789);
      expect($scope.rules).toEqual(rulesMock);
    });

    it('sets single desc line based on publisher ruleset', function () {
      rulesMock.descriptiveLines = [1];

      buildController();

      expect($scope.singleDescLine).toEqual(true);
    });

    it('sets multiple desc line based on publisher ruleset', function () {
      rulesMock.descriptiveLines = [1, 2];

      buildController();

      expect($scope.singleDescLine).toEqual(false);
    });
  });

  describe('single descriptive line', function () {
    beforeEach(function () {
      $scope.publisher = { publisherId: 789 };
    });

    it('concats descriptive line one and two', function () {
      rulesMock.descriptiveLines = [1];

      buildController();
      $scope.linkedTo = {
        descriptiveLines: ['Line 1', 'Line 2']
      };
      $scope.link();
      $scope.$digest();

      expect($scope.creative.descriptiveLines[0]).toEqual('Line 1 Line 2');
    });
  });
});
