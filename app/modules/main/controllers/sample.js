angular.rlmodule('rl.cpi.main.controllers.sample', []).
    controller('Sample', function($scope) {
        $scope.sample = 'Your app is working.';
        console.log($scope.sample);
    });
