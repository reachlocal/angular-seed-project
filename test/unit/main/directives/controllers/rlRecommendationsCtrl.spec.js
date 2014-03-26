describe('Creative View/Editing Controller', function () {
    var mockRecommendations = {
        hasActiveRecommendations: null,
        items: [ 1, 2, 3 ]
    };

    var $scope;

    // Load the template cache, it's in the 'rl' module
    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlRecommendations'));

    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();
        $scope.recommendations = mockRecommendations;
        $controller('rlRecommendationsCtrl', { $scope: $scope });
    }));

    describe("item expanded/collapsed state", function() {
        it("items begin in collapsed state", function() {
            expect($scope.isItemExpanded(0)).toBe(false);
        });
        it("item state can be toggled between expanded/collapsed", function() {
            expect($scope.isItemExpanded(0)).toBe(false);
            $scope.toggleItemExpanded(0);
            expect($scope.isItemExpanded(0)).toBe(true);
            $scope.toggleItemExpanded(0);
            expect($scope.isItemExpanded(0)).toBe(false);
        });
    });

    describe("well done message", function() {
        it("is displayed when there are no recommendations", function() {
            spyOn(mockRecommendations, 'hasActiveRecommendations').andReturn(false);
            expect($scope.showWellDoneMessage()).toBe(true);
            expect(mockRecommendations.hasActiveRecommendations).toHaveBeenCalled();
        });
        it("is hidden when there are recommendations", function() {
            spyOn(mockRecommendations, 'hasActiveRecommendations').andReturn(true);
            expect($scope.showWellDoneMessage()).toBe(false);
            expect(mockRecommendations.hasActiveRecommendations).toHaveBeenCalled();
        });
        it("stays hidden when the user closes it", function() {
            spyOn(mockRecommendations, 'hasActiveRecommendations').andReturn(false);
            expect($scope.showWellDoneMessage()).toBe(true);
            $scope.closeWellDoneMessage();
            expect($scope.showWellDoneMessage()).toBe(false);
        });
    });

});
