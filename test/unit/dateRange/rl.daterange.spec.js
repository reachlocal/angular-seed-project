describe('rl.daterange', function () {
  var customRange;

  beforeEach(module('rl.daterange'));
  beforeEach(function () {
    customRange = { from: '1985-10-26', to: '2015-10-21' };
  });

  describe('controller', function () {

    describe('initialization', function () {
      it('generates an id to be used on the widget', function () {
        var scope = initializeController();
        expect(scope.id).toEqual('daterange-0000001');
      });

      it('sets a value to be used as custom', function () {
        var scope = initializeController();
        expect(scope.custom).toBeDefined();
      });

      it('sets the range value to custom', function () {
        var scope = initializeController();
        expect(scope.range).toEqual(scope.custom);
      });

      it('sets the given value to the model', function () {
        var scope = initializeController({ options: { value: customRange } });
        expect(scope.model).toEqual(customRange);
      });
    });

    describe('options', function () {
      it('provide defaults', function () {
        var scope = initializeController();
        expect(scope.options).toBeDefined();
        expect(scope.options.customLabel).toEqual('Custom');
        expect(scope.options.ranges).toEqual([]);
        expect(scope.options.dateFormat).toEqual('MMM, dd yyyy');
      });

      it('extends the defaults with provided', function () {
        var scope = { options: { customLabel: 'Now this is custom' } };
        scope = initializeController(scope);
        expect(scope.options).toBeDefined();
        expect(scope.options.customLabel).toEqual('Now this is custom');
        expect(scope.options.ranges).toEqual([]);
        expect(scope.options.dateFormat).toEqual('MMM, dd yyyy');
      });
    });

    describe('when setting a new range', function () {
      var scope;
      beforeEach(function () { scope = initializeController(); });

      it('sets the new value to the model', function () {
        scope.model = undefined;
        scope.range = customRange;
        scope.$digest();
        expect(scope.model).toEqual(customRange);
      });

      it('does not change the model if the range is custom', function () {
        scope.model = customRange;
        scope.range = scope.custom;
        scope.$digest();
        expect(scope.model).toEqual(customRange);
      });
    });

    function initializeController (customScope) {
      var scope;
      inject(function($controller, $rootScope) {
        $controller('rlDateRangeCtrl', {
          $window: { Date: { now: function () { return '0000001'; } } },
          $scope: scope = angular.extend($rootScope.$new(), customScope)
        });
      });
      return scope;
    }
  });
});