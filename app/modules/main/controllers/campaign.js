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
                                      recommendations, creatives, $filter) {
        $rootScope.pageTitle = "Campaign Overview";
        $scope.publishers = publishers;
        $scope.campaignOverview = campaignOverview;
        $scope.recommendations = recommendations;
        $scope.creatives = creatives;

        $scope.creativeHeaders = {
            impressionsShare: {
                name: "Impression Share",
                shortName: "iShare",
                format: "percent"
            },
            impressions: {
                name: "Impressions",
                shortName: "Imp",
                description: "An impression is counted every time the creative is displayed",
                format: "integer"
            },
            clicks: {
                name: "Clicks",
                description: "The Clicks column in your reports indicates how many times your advertisements were clicked by visitors",
                format: "integer"
            },
            clickThroughRate: {
                name: "Click Through Rate",
                shortName: "CTR",
                description: "Click through rate",
                format: "percent"
            },
            leadCount: {
                name: "Lead Count",
                shortName: "LEADS",
                format: "integer"
            },
            conversions: {
                name: "Conversions",
                shortName: "CONV",
                description: "How often users who click through an ad convert to potential leads",
                format: "percent"
            },
            averagePosition: {
                name: "Average Position",
                shortName: "POS",
                description: "When a list of ads is shown, this ad shows up in this row",
                format: "decimal"
            },
            qualityScore: {
                name: "Quality Score",
                shortName: "QSCORE",
                description: "How much google loves you",
                format: "integer"
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
                        return recommendations;
                    },
                    creatives: function(Creatives, $stateParams) {
                        var creatives = Creatives.query({campaignId: $stateParams.campaignId});
                        return creatives.$promise;
                    }
                },
                url: '^/campaign/:campaignId?adgroups',
                templateUrl: 'modules/main/controllers/campaign.html',
                controller: 'Campaign'
            });
    });
