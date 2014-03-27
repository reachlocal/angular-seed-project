angular
    .rlmodule('rl.cpi.main.controllers.Campaign',
        ['rl.cpi.main.directives',
         'rl.cpi.main.services.Publishers',
         'rl.cpi.main.services.CampaignOverview',
         'rl.cpi.main.services.Recommendations',
         'rl.cpi.main.services.Creatives',
         'rl.cpi.l10n.directives.rlLocaleSelector',
         'ui.router'])
    .controller('Campaign', function ($scope, $rootScope, publishers, campaignOverview,
                                      recommendations, creatives, creativeHeaders, $filter) {
        $rootScope.pageTitle = "Campaign Overview";
        $scope.publishers = publishers;
        $scope.campaignOverview = campaignOverview;
        $scope.recommendations = recommendations;
        $scope.creatives = creatives;
        $scope.creativeHeaders = creativeHeaders;
    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('campaign', {
                resolve: {
                    publishers: function(Publishers, $stateParams) {
                        var publishers = Publishers.get({campaignId: $stateParams.campaignId});
                        return publishers.$promise;
                    },
                    campaignOverview: function(CampaignOverview, $stateParams) {
                        var campaignOverview = CampaignOverview.get({campaignId: $stateParams.campaignId});
                        return campaignOverview.$promise;
                    },
                    recommendations: function(Recommendations, $stateParams) {
                        var recommendations = Recommendations.query({campaignId: $stateParams.campaignId});
                        return recommendations;
                    },
                    creatives: function(Creatives, $stateParams) {
                        var creatives = Creatives.query({campaignId: $stateParams.campaignId});
                        return creatives.$promise;
                    },
                    creativeHeaders: 'CreativeHeaders'
                },
                url: '^/campaign/:campaignId',
                templateUrl: 'modules/main/controllers/campaign.html',
                controller: 'Campaign',
                reloadOnSearch: false
            });
    });
