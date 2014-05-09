describe('Creative cell controller', function () {
  var $scope, Creative, rulesStub, controller;

  beforeEach(function () {
    module('rl.cpi.main.directives.rlCreativeCell');
    module('rl.cpi.main.services.Creatives');
    inject(function ($controller, $rootScope, _Creatives_) {
      rulesStub = {
        asHash: angular.noop
      };
      controller = $controller;
      $scope = $rootScope.$new();
      $scope.creative = { campaignId: '123' };
      Creative = _Creatives_;
    });
  });

  function buildController() {
    controller('rlCreativeCellCtrl', { $scope: $scope, PublisherTextCreativeRules: rulesStub });
  }

  describe('initialization', function () {
    it('pulls in validation rules', function () {
      spyOn(rulesStub, 'asHash').andCallThrough();
      buildController();
      expect(rulesStub.asHash).toHaveBeenCalled();
    });
  });

  describe('updates', function () {
    beforeEach(buildController);

    it('duplicates the creative in order to avoid the creative model in a bad state', function () {

      $scope.creative = { headLines: ['original value'] };
      var creativeCopy = { headLines: ['original value'], $update: function () {
        return 'success';
      } };
      spyOn(angular, 'copy').andCallFake(function (arg) {
        return (arg === $scope.creative) ? creativeCopy : undefined;
      });

      var result = $scope.update('headLines', 0, 'updated value');

      expect(creativeCopy.headLines[0]).toEqual('updated value');
      expect(result).toEqual('success');
    });

    it('sets the creative as staged upon any model change', function () {
      $scope.creative = new Creative({ status: 'NEW', headLines: [ 'original value' ] });
      $scope.$digest();
      expect($scope.creative.isStaged()).toEqual(false);

      $scope.creative.headLines[0] = 'updated value';
      $scope.$digest();
      expect($scope.creative.isStaged()).toEqual(true);
    });
  });
});

