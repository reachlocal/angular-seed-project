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

            it('sets the default value to the model if model from/to are not set', function () {
                var scope = initializeController({ optionsIn: { defaultRange: customRange } });
                expect(scope.model).toEqual(customRange);
            });

            it('uses model range if present', function () {
                var scope = initializeController({ model: customRange });
                expect(scope.model).toEqual(customRange);
            });
        });

        describe('options', function () {
            it('provide defaults', function () {
                var scope = initializeController();
                expect(scope.options).toBeDefined();
                expect(scope.options.customLabel).toEqual('Custom');
                expect(scope.options.format).toEqual('YYYY-MM-DD');
            });

            it('extends the defaults with provided', function () {
                var scope = { optionsIn: { customLabel: 'Now this is custom' } };
                scope = initializeController(scope);
                expect(scope.options).toBeDefined();
                expect(scope.options.customLabel).toEqual('Now this is custom');
                expect(scope.options.format).toEqual('YYYY-MM-DD');
            });
        });

        describe('when setting a new range', function () {
            var scope;
            beforeEach(function () {
                scope = initializeController();
            });

            it('sets the new value to the model', function () {
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

        function initializeController(customScope) {
            var scope;
            inject(function ($controller, $rootScope) {
                var baseScope = $rootScope.$new();
                baseScope.model = {};
                $controller('rlDateRangeCtrl', {
                    $window: { Date: { now: function () {
                        return '0000001';
                    } } },
                    $scope: scope = angular.extend(baseScope, customScope)
                });
            });
            return scope;
        }
    });
});