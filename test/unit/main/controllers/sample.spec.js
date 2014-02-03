describe('sample.js', function() {

    var ctrl;
    var $scope;

    beforeEach(function() {
        module('rl.cpi.main.controllers.sample');
        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('Sample', {$scope: $scope});
        });
    });

    it('has a valid sample variable', function() {
        expect($scope.sample).toEqual('Your app is working.');
    });
})