angular.rlmodule('rl.cpi.campaignNewCreative', [
  'ui.router',
  'rl.back',
  'rl.cpi.main.services.Publishers',
  'rl.cpi.main.services.PublisherTextCreativeRules'
])
  .config(function ($stateProvider) {
    $stateProvider.state('cpi.campaignNewCreative', {
      url: '/new-creative',
      data: { title: 'New Creative' },
      templateUrl: 'modules/rl.cpi/campaign.new-creative/new-creative.html',
      controller: 'NewCreativeCtrl',
      resolve: {
        publishers: function (Publishers, $stateParams) {
          var publishers = Publishers.get({campaignId: $stateParams.campaignId});
          return publishers.$promise;
        },
        // Pre-cache publisher rules before the page loads - they're not optional for this page :)
        // Subsequent requests to this service will use the rules we pre-load here.  Yay!
        publisherRules: function (PublisherTextCreativeRules, $stateParams) {
          var publisherRules = PublisherTextCreativeRules.allByCampaignId($stateParams.campaignId);
          return publisherRules.$promise;
        }
      }
    });
  })
  .controller('NewCreativeCtrl', function ($scope, campaign, publishers, $window) {
    $scope.campaign = campaign;
    $scope.publishers = publishers.webPublisherCampaigns;
    $scope.masterCreative = { headLine: '', descriptiveLine: ['', ''] };
  });
