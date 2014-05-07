describe('rlCreativeStateCtrl', function () {
  var creative;
  var $scope;
  var deferred;
  var rootScope;

  beforeEach(module('rl.cpi.main.directives.rlCreativeState'));
  beforeEach(inject(function($controller, $rootScope, $q) {
    rootScope = $rootScope;
    deferred = $q.defer();
    $scope = $rootScope.$new();
    creative = {
      state: 'ACTIVE',
      $update: function () { return deferred.promise; },
      setStaged: angular.noop
    };
    $scope.creative = creative;
    $controller('rlCreativeStateCtrl', { $scope: $scope });
  }));

  describe('initial state', function () {
    it('shows the active state', function () {
      $scope.creative.state = 'ACTIVE';
      expect($scope.isActive()).toBe(true);
    });

    it('shows the inactive state', function () {
      $scope.creative.state = 'INACTIVE';
      expect($scope.isActive()).toBe(false);
    });
  });

  describe('saving a state', function () {
    it('calls $update and sends the updated state', function () {
      var newState = '';
      creative.$update = function () {
        newState = this.state;
        return deferred.promise;
      };
      spyOn($scope.creative, '$update')
        .andCallThrough();

      $scope.toggleActive();

      expect($scope.creative.$update).toHaveBeenCalled();
      expect(newState).toBe('INACTIVE');
    });

    it('does not update the model if $update fails', function () {
      $scope.toggleActive();
      deferred.reject();
      rootScope.$apply();

      expect($scope.creative.state).toBe('ACTIVE');
    });

    it('updates the model if $update succeeds', function () {
      var creativeCopy = { state: 'ACTIVE', $update: creative.$update };
      spyOn(creative, 'setStaged').andCallThrough();
      spyOn(angular, 'copy').andCallFake(function(arg) {
        return (arg === $scope.creative) ? creativeCopy : undefined;
      });

      $scope.toggleActive();
      deferred.resolve();
      rootScope.$apply();

      expect($scope.creative.state).toBe('INACTIVE');
      expect(creative.setStaged).toHaveBeenCalled();
    });
  });
});

