angular
    .rlmodule('rl.cpi.main.controllers.NewCreative',
        ['rl.cpi.main.directives',
         'rl.cpi.main.services.Publishers',
         'rl.cpi.main.services.CampaignOverview',
         'ui.router'])

    .controller('NewCreative', function ($scope, publishers, campaignOverview) {
        $scope.campaignOverview = campaignOverview;
        $scope.publishers = publishers.webPublisherCampaigns;
        // _.each($scope.publishers,function(e) { e.selected = true; });

        $scope.masterCreative = {
            headLine: "Yo",
            descriptiveLine: [ "mama", "is nice" ]
        };
    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('newCreative', {
                resolve: {
                    publishers: function(Publishers, $stateParams) {
                        var publishers = Publishers.get({campaignId: $stateParams.campaignId});
                        return publishers.$promise;
                    },
                    campaignOverview: function(CampaignOverview, $stateParams) {
                        var campaignOverview = CampaignOverview.get({campaignId: $stateParams.campaignId});
                        return campaignOverview.$promise;
                    },
                },
                url: '^/campaign/:campaignId/new-creative',
                templateUrl: 'modules/main/controllers/newCreative.html',
                controller: 'NewCreative',
                reloadOnSearch: false
            });
    });
