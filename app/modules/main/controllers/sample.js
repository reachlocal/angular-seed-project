angular.rlmodule('rl.cpi.main.controllers.sample', []).
    controller('Sample', function($scope) {
        $scope.sample = 'Your app is working.';
        console.log($scope.sample);
        $scope.sample2 = 'This is a test variable for the spec file.';
    });