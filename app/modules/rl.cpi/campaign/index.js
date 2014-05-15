angular.rlmodule('rl.cpi.campaign', [
  'ui.router',
  'rl.daterange',
  'rl.QueryParams',
  'rl.stick'
])

.config(function ($stateProvider) {

  $stateProvider.state('cpi.campaign', {
    url: '',
    views: {
      'content': { templateUrl: 'modules/rl.cpi/campaign/index.html' },

      'filters@cpi.campaign': {
        templateUrl: 'modules/rl.cpi/campaign/views/filters.html',
        controller: 'campaign.controllers.filters',
        resolve: { creatives: function (Creatives, $stateParams) {
          return Creatives.query($stateParams).$promise;
        }}
      },

      'charts@cpi.campaign': {
        templateUrl: 'modules/rl.cpi/campaign/views/charts.html'
      },

      'recommendations@cpi.campaign': {
        templateUrl: 'modules/rl.cpi/campaign/views/recommendations.html',
        controller: 'campaign.controllers.recommendations',
        resolve: { recommendations: function (Recommendations, $stateParams) {
          return Recommendations.query($stateParams);
        }}
      },

      'creative-metrics@cpi.campaign': {
        templateUrl: 'modules/rl.cpi/campaign/views/creative-metrics.html',
        controller: 'campaign.controllers.creative-metrics',
        resolve: { creatives: function (Creatives, $stateParams) {
          return Creatives.query($stateParams).$promise;
        }}
      }
    }
  });
});
