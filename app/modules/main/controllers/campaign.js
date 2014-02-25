angular
    .rlmodule('rl.cpi.main.controllers.Campaign',
        ['rl.cpi.main.directives',
         'rl.cpi.main.services.Publishers',
         'rl.cpi.main.services.CampaignOverview',
         'rl.cpi.main.services.Creatives',
         'ui.router'])
    .controller('Campaign', function ($scope, $rootScope, publishers, campaignOverview, recommendations, creatives) {
        $rootScope.pageTitle = "Campaign Overview";
        $scope.publishers = publishers;
        $scope.campaignOverview = campaignOverview;
        $scope.recommendations = recommendations;
        $scope.creatives = creatives;

        $scope.creativeHeaders = {
            impressions: {
                name: "Impressions",
                shortName: "Imp",
                description: "An impression is counted every time the creative is displayed",
                format: "number"
            },
            clicks: {
                name: "Clicks",
                description: "The Clicks column in your reports indicates how many times your advertisements were clicked by visitors",
                format: "number"
            },
            clickThroughRate: {
                name: "Click Through Rate",
                shortName: "CTR",
                description: "Click through rate",
                format: "percent"
            }
        };
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
                        return recommendations.$promise;
                    },
                    creatives: function(Creatives, $stateParams) {
                        var creatives = Creatives.query({campaignId: $stateParams.campaignId});
                        return creatives.$promise;
                    }
                },
                url: '^/campaign/:campaignId',
                templateUrl: 'modules/main/controllers/campaign.html',
                controller: 'Campaign'
            });
    });
