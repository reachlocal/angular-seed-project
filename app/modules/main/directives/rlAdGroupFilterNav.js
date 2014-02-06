angular
    .rlmodule('rl.cpi.main.directives.rlAdGroupFilterNav', ['ui.bootstrap', 'rl.cpi.main.services.adGroups'])
    .directive('rlAdGroupFilterNav', function () {
        return {
            templateUrl: "modules/main/directives/rlAdGroupFilterNav.html",
            scope: {},
            restrict: 'E',
            controller: function ($scope, AdGroups) {
//                $scope.publishers = AdGroups.get();
                $scope.publishers = [{
                    name: "Google",
                    adGroups: [{
                        name: "Local Roto-rooting",
                        id:  123
                    }, {
                        name: "DMA Roto-rooting",
                        id: 456
                    }]
                }, {
                    name: "Bing",
                    adGroups: [{
                        name: "Local Roto-rooting",
                        id:  123
                    }]
                }, {
                    name: "ALL",
                    adGroups: [{
                        name: "Local Roto-rooting",
                        id:  123
                    }, {
                        name: "DMA Roto-rooting",
                        id: 456
                    }]
                }]
            }
        };

    });
