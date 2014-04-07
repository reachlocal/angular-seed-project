angular
    .rlmodule('rl.cpi.main.directives.rlPublisherFilterNav', ['ui.bootstrap'])
    .controller('rlPublisherFilterNavCtrl', function($scope, PublisherFilterService) {
        PublisherFilterService.load($scope.creatives);
        $scope.publishers = PublisherFilterService.publishers;
        $scope.selectedPublisher = PublisherFilterService.selectedPublisher;
        $scope.selectedAdGroup   = PublisherFilterService.selectedAdGroup;

        $scope.$watch('selectedPublisher', function(value) {
            PublisherFilterService.setPublisher(value);
        });
        $scope.$watch('selectedAdGroup', function(value) {
            PublisherFilterService.setAdGroup(value);
        });
    })
    .directive('rlPublisherFilterNav', function () {
        return {
            templateUrl: "modules/main/directives/rlPublisherFilterNav/rlPublisherFilterNav.html",
            scope: {
                creatives: '='
            },
            restrict: 'E',
            replace: true,
            controller: 'rlPublisherFilterNavCtrl'
        };
    });
