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
    $scope.ngModel = {
      headLines: ['headline'],
      descriptiveLines: ['foo', 'bar'],
      adGroup: { id: 1, name: 'foo' }
    };
    rootScope = $rootScope;
    controller = $controller;

    rulesMock        = { descriptiveLines: [], headLines: [] };
    ruleSetMock      = { forPublisherId: null, defaultRule: null };
    rulesServiceMock = { allByCampaignId: null };
    spyOn(rulesServiceMock, 'allByCampaignId').andReturn(ruleSetMock);
    spyOn(ruleSetMock, 'forPublisherId').andReturn({ descriptiveLines: [ {}, {} ] });
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
      $scope.publisher = {};
      $scope.publisher.adGroups = [ { id: 1, name: 'foo' }, { id: 2, name: 'bar' } ];
      buildController();
      $scope.$digest();
    });

    it('synchronizes values with master', function () {
      expect($scope.creative.headLines[0]).toBe('a headline');
      expect($scope.creative.descriptiveLines[0]).toBe('one line');
      expect($scope.creative.descriptiveLines[1]).toBe('other line');
      expect($scope.isLinked).toBe(true);
    });

    it('synchronizes adgroup with master', function () {
      masterCreative.adGroup = { id: 0, name: 'bar' };
      $scope.$digest();

      expect($scope.creative.adGroup.name).toBe('bar');
      // it should use the creative's publisher group id, not master's
      expect($scope.creative.adGroup.id).toBe(2);
    });

    it('unlinks if adgroup cannot be synced with master', function () {
      masterCreative.adGroup = { id: 0, name: 'baz' };
      $scope.creative.adGroup = 'not null';
      $scope.$digest();

      expect($scope.creative.adGroup).toBe(undefined);
      expect($scope.isLinked).toBe(false);
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
      $scope.linkedTo = {  };
    });

    it('uses publisher specific ruleset', function () {
      buildController();

      expect(ruleSetMock.forPublisherId).toHaveBeenCalledWith(789);
<<<<<<< HEAD
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
    it('concats descriptive line one and two', function () {
      buildController();
      $scope.singleDescLine = true;

      $scope.linkedTo = {
        descriptiveLines: ['Line 1', 'Line 2']
      };
      $scope.link();
      $scope.$digest();

      expect($scope.creative.descriptiveLines[0]).toEqual('Line 1 Line 2');
    });
  });

  describe('enable/disable', function () {
    beforeEach(buildController);
    it('starts out enabled', function () {
      expect($scope.isEnabled).toBe(true);
    });

    it('can be enabled', function () {
      $scope.isEnabled = false;
      $scope.enable();

      expect($scope.isEnabled).toBe(true);
    });

    it('can be disabled', function () {
      $scope.isEnabled = true;
      $scope.disable();

      expect($scope.isEnabled).toBe(false);
    });

    describe('when it is disabled', function () {
      it('clears all fields', function () {
        $scope.disable();

        expect($scope.creative.headLines[0]).toBe('');
        expect($scope.creative.descriptiveLines[0]).toBe('');
        expect($scope.creative.adGroup).toBe(undefined);
      });

      it('unlinks the card', function () {
        $scope.disable();
        expect($scope.isLinked).toBe(false);
      });
    });

    describe('when it is enabled', function () {
      it('is linked to the master', function () {
        $scope.disable();
        $scope.enable();

        expect($scope.isLinked).toBe(true);
      });
    });
  });
});
