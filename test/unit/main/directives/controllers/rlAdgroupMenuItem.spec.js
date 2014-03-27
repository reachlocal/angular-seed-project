describe('rlAdgroupMenuItem Controller', function () {

    var adgroup = {
            "id": 2365864,
            "name": "Sidewalks and Driveways"
        };
    var $scope;
    var controller;
    var filter;

    beforeEach(module('rl.cpi.main.directives.rlAdgroupMenuItem'));

    beforeEach(inject(function($controller, $rootScope, _AdgroupFilter_) {
        $scope = $rootScope.$new();
        $scope.adgroup = adgroup;
        controller = $controller;
        filter = _AdgroupFilter_;
    }));

    describe('when directive loads', function() {
        it("registers its adgroup name", function () {
            spyOn(filter, 'registerAdgroup');

            controller('rlAdgroupMenuItemCtrl', { $scope: $scope, AdgroupFilter: filter });

            expect(filter.registerAdgroup).toHaveBeenCalledWith(adgroup.name, adgroup.id);
        });
        it("checks the displayed status", function() {
            spyOn(filter, 'isDisplayed');

            controller('rlAdgroupMenuItemCtrl', { $scope: $scope, AdgroupFilter: filter });

            expect(filter.isDisplayed).toHaveBeenCalledWith(adgroup.id);
        });
    });

    describe('selected toggling', function() {
        it("toggles selected on", function() {
            spyOn(filter, 'add');

            controller('rlAdgroupMenuItemCtrl', { $scope: $scope, AdgroupFilter: filter });
            $scope.selected = true;
            $scope.$digest();

            expect(filter.add).toHaveBeenCalledWith(adgroup.id);
        });
        it("toggles selected off", function() {
            spyOn(filter, 'remove');

            controller('rlAdgroupMenuItemCtrl', { $scope: $scope, AdgroupFilter: filter });
            $scope.selected = false;
            $scope.$digest();

            expect(filter.remove).toHaveBeenCalledWith(adgroup.id);
        });
    });

});
