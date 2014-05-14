angular
  .rlmodule('rl.cpi.main.controllers.Campaign',
  ['rl.cpi.main.directives',
    'rl.cpi.main.services.Publishers',
    'rl.cpi.main.services.CampaignOverview',
    'rl.cpi.main.services.Recommendations',
    'rl.cpi.main.services.Creatives',
    'rl.cpi.main.services.TextCreativeReports',
    'rl.cpi.l10n.directives.rlLocaleSelector',
    'rl.QueryParams',
    'ui.router'])
  .controller('Campaign', function ($scope, $rootScope, $filter, campaignOverview, recommendations, creatives, TextCreativeReports, CreativeHeaders, QueryParams) {
    $rootScope.pageTitle = 'Campaign Overview';
    $scope.campaignOverview = campaignOverview;
    $scope.recommendations = recommendations;
    $scope.creatives = creatives;
    $scope.creativeHeaders = CreativeHeaders;

    function getReports() {
      $scope.reports = TextCreativeReports.query({
        from: QueryParams.from,
        to: QueryParams.to,
        masterCampaignId: $scope.campaignOverview.masterCampaignId
      });
    }

    $scope.QueryParams = QueryParams;
    $scope.$watch('QueryParams.from+QueryParams.to', getReports);
  })

  .config(function ($stateProvider) {
    $stateProvider
      .state('campaign', {
        resolve: {
          campaignOverview: function (CampaignOverview, $stateParams) {
            var campaignOverview = CampaignOverview.get({campaignId: $stateParams.campaignId});
            return campaignOverview.$promise;
          },
          recommendations: function (Recommendations, $stateParams) {
            var recommendations = Recommendations.query({campaignId: $stateParams.campaignId});
            return recommendations;
          },
          creatives: function (Creatives, $stateParams) {
            var creatives = Creatives.query({campaignId: $stateParams.campaignId});
            return creatives.$promise;
          }
        },
        url: '^/campaign/:campaignId',
        templateUrl: 'modules/rl.cpi/controllers/campaign.html',
        controller: 'Campaign'
      });
  });
