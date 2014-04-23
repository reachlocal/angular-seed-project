angular
    .rlmodule('rl.cpi.main.controllers.Campaign',
        ['rl.cpi.main.directives',
         'rl.cpi.main.services.Publishers',
         'rl.cpi.main.services.CampaignOverview',
         'rl.cpi.main.services.Recommendations',
         'rl.cpi.main.services.Creatives',
         'rl.cpi.main.services.TextCreativeReports',
         'rl.cpi.main.services.DateRange',
         'rl.cpi.l10n.directives.rlLocaleSelector',
         'ui.router'])
    .controller('Campaign', function ($scope, $rootScope, $filter,
                                      campaignOverview, recommendations, creatives,
                                      TextCreativeReports, CreativeHeaders, DateRange, $stateParams) {
        $rootScope.pageTitle = "Campaign Overview";
        $scope.campaignOverview = campaignOverview;
        $scope.recommendations = recommendations;
        $scope.creatives = creatives;
        $scope.creativeHeaders = CreativeHeaders;

        function getReports() {
            var params = {
                masterCampaignId: $scope.campaignOverview.masterCampaignId,
                from:             DateRange.from().format('YYYY-MM-DD'),
                to:               DateRange.to().format('YYYY-MM-DD')
            };
            $scope.reports = TextCreativeReports.query(params);
        }
        getReports();
        $scope.$on('rl:dateRange:updated', getReports);
    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('campaign', {
                resolve: {
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
                url: '^/campaign/:campaignId',
                templateUrl: 'modules/main/controllers/campaign.html',
                controller: 'Campaign',
                reloadOnSearch: false
            });
    });
