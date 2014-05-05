describe('Creative cell controller', function () {
    var $scope;

    beforeEach(module('rl.cpi.main.directives.rlCreativeCell'));
    beforeEach(inject(function($controller, $rootScope) {
      $controller('rlCreativeCellCtrl', { $scope: $scope = $rootScope.$new() });
    }));

    describe('updates', function() {
      it('duplicates the creative in order to avoid the creative model in a bad state', function() {

        $scope.creative = { headLines: ['original value'] };
        var creativeCopy = { headLines: ['original value'], $update: function() { return 'success'; } };
        spyOn(angular, 'copy').andCallFake(function(arg) {
          return (arg === $scope.creative) ? creativeCopy : undefined;
        });

        var result = $scope.update('headLines', 0, 'updated value');

        expect(creativeCopy.headLines[0]).toEqual('updated value');
        expect(result).toEqual('success');
      });

      it('set creative as staged', function() {

        $scope.creative = { headLines: ['original value'], staged: false };

        $scope.setStaged();

        expect($scope.creative.staged).toEqual(true);
      });
    });
});

