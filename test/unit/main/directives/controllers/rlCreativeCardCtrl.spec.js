describe('RL Creative Card Editor', function () {

    var $scope, controller;
    var rootScope;

    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlCreativeCard'));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        rootScope = $rootScope;
        controller = $controller;
    }));

    function buildController () {
        controller('rlCreativeCardCtrl', {
            $scope: $scope,
            $rootScope: rootScope,
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

        it('unlinks when user edits it', function () {
            $scope.creative.headLine = 'a different headline';
            $scope.$digest();

            expect(masterCreative.headLine).toBe('a headline');

            masterCreative.headLine = 'yet another headline';
            $scope.$digest();

            expect($scope.creative.headLine).toBe('a different headline');
            expect($scope.isLinked).toBe(false);
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
});
