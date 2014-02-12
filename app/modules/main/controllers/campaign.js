angular.rlmodule('rl.cpi.main.controllers.campaign',
        ['rl.cpi.main.directives',
         'rl.cpi.main.services.publishers',
         'rl.cpi.main.services.campaignOverview',
         'ui.router'])

    .controller('Campaign', function ($scope, $rootScope, publishers, campaignOverview) {
        $rootScope.pageTitle = "Campaign Overview";
        $scope.publishers = publishers;
        $scope.campaignOverview = campaignOverview;
    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('campaign', {
                resolve: {
                    publishers: function(Publishers, $stateParams) {
                        var publishers = Publishers.query({campaignId: $stateParams.campaignId});
                        return publishers.$promise;
                    },
                    campaignOverview: function(CampaignOverview, $stateParams) {
                        var campaignOverview = CampaignOverview.get({campaignId: $stateParams.campaignId});
                        return campaignOverview.$promise;
                    }
                },
                url: '^/campaign/:campaignId',
                templateUrl: 'modules/main/controllers/campaign.html',
                controller: 'Campaign'
            });
    });
