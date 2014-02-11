angular.rlmodule('rl.cpi.main.controllers.campaign',
        ['rl.cpi.main.directives',
         'rl.cpi.main.services.publishers',
         'ui.router'])

    .controller('Campaign', function ($scope, $rootScope, publishers) {
        $rootScope.pageTitle = "Campaign Overview";
        $scope.publishers = publishers;
    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('campaign/:campaignId', {
                resolve: {
                    publishers: function(Publishers) {
                        var publishers = Publishers.query();
                        return publishers.$promise;
                    }
                },
                url: '/campaign',
                templateUrl: 'modules/main/controllers/campaign.html',
                controller: 'Campaign'
            });
    });