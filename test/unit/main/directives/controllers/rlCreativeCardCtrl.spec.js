describe('RL Creative Card Editor', function () {

    var $scope, controller;
    var rootScope;

    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlCreativeCard'));

    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();
        rootScope = $rootScope;
        controller = $controller;
    }));

    function buildController() {
        controller('rlCreativeCardCtrl', {
            $scope: $scope,
            $rootScope: rootScope,
        });
    }

    describe("is the master creative", function() {
        it("uses the passed creative", function() {
            $scope.masterOf = {
                headLine: 'a headline',
                descriptiveLine: [ 'one line', 'other line' ]
            };

            buildController();

            $scope.$digest();

            expect($scope.creative.headLine).toBe('a headline');
            expect($scope.creative.descriptiveLine[0]).toBe('one line');
            expect($scope.creative.descriptiveLine[1]).toBe('other line');

        });
    });

    describe("is based on a master creative", function() {
        var masterCreative;
        beforeEach(function() {
            masterCreative = {
                headLine: 'a headline',
                descriptiveLine: [ 'one line', 'other line' ]
            };
        });
        it("synchronizes values with master", function() {
            $scope.basedOn = masterCreative;

            buildController();

            $scope.$digest();

            expect($scope.creative.headLine).toBe('a headline');
            expect($scope.creative.descriptiveLine[0]).toBe('one line');
            expect($scope.creative.descriptiveLine[1]).toBe('other line');
        });
        it("unlinks when user edits it", function() {
            $scope.basedOn = masterCreative;

            buildController();
            $scope.$digest();

            $scope.creative.headLine = 'a different headline';
            $scope.$digest();

            expect(masterCreative.headLine).toBe('a headline');
            expect($scope.creative.headLine).toBe('a different headline');

            masterCreative.headLine = 'yet another headline';
            $scope.$digest();

            expect(masterCreative.headLine).toBe('yet another headline');
            expect($scope.creative.headLine).toBe('a different headline');
        });
        xit("user explicitly link creative again", function() {
            $scope.basedOn = masterCreative;

            buildController();
            $scope.$digest();

            $scope.creative.headLine = 'a different headline';
            $scope.$digest();

            $scope.linkWithMaster();
            masterCreative.headLine = 'yet another headline';
            $scope.$digest();

            expect($scope.creative.headLine).toBe('yet another headline');

        });
    });
});
