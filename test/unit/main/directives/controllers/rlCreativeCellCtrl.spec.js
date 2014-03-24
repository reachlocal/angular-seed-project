describe('Creative View/Editing Controller', function () {

    var originalCreative = {
        "id": 10845748,
        "headLines": [
            "Driveway Coating and More"
        ],
        "descriptiveLines": [
            "Driveway and Sidewalk Sealcoating,",
            "Repairs and Maintenance. Call Now."
        ],
        "status": "ACTIVE",
        "adGroup": {
            "id": 2365864,
            "name": "Sidewalks and Driveways"
        },
        "publisher": {
            "publisherName": "Google",
            "publisherId": 1,
            "geoType": "NATIONAL"
        },
        "displayUrl": "www.advancedsurfacing.info",
        "targetUrl": "http://advancedsurfacing.reachlocal.com/?scid=2953809"
    };
    var $scope;

    // Load the template cache, it's in the 'rl' module
    beforeEach(localeFixture);
    beforeEach(module('rl.cpi'));
    beforeEach(module('rl.cpi.main.directives.rlCreativeCell'));

    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();
        $scope.creative = angular.copy(originalCreative);
        $controller('rlCreativeCellCtrl', { $scope: $scope });
    }));

    it("start out in view mode", function () {
        expect($scope.edit).toBe(false);
    });

    describe('editing a creative', function() {
        beforeEach(function() {
            $scope.enterEditMode();
        });

        it("enters edit mode", function () {
            expect($scope.edit).toEqual(true);
        });

        it("reverts to original creative upon cancelling", function() {
            $scope.creative.headLines[0] = "Your mom uses Perl";
            $scope.cancelEditMode();
            expect($scope.creative).toEqual(originalCreative);
            expect($scope.edit).toBe(false);
        });

        it("saving closes", function() {
            $scope.creative.headLines[0] = "Your mom loves Perl";
            $scope.save();
            expect($scope.creative).toNotEqual(originalCreative);
            expect($scope.edit).toBe(false);
        });

        it("reverts to the latest saved stated", function() {
            $scope.creative.headLines[0] = "We all love Perl";
            $scope.save();
            expect($scope.creative.headLines[0]).toEqual('We all love Perl');

            $scope.enterEditMode();
            $scope.creative.headLines[0] = "We really love Perl";
            $scope.cancelEditMode();
            expect($scope.creative.headLines[0]).toEqual('We all love Perl');
        });
    });

});
