angular.rlmodule('rl.cpi.campaign', [
  'ui.router',
  'rl.daterange',
  'rl.QueryParams',
  'rl.stick'
])

.config(function ($stateProvider) {
  $stateProvider.state('cpi.campaign', { url: '',
    abstract: true,
    templateUrl: 'modules/rl.cpi/campaign/index.html',
    controller: function ($scope, creatives) {
      $scope.creatives = creatives
    },
    resolve: {
      creatives: function (Creatives, $stateParams) {
        return Creatives.query($stateParams).$promise;
      }
    }
  })

  .state('cpi.campaign.details', { url: '',
    views: {
      'filters': {
        templateUrl: 'modules/rl.cpi/campaign/views/filters.html',
        controller: 'FiltersCtrl'
      },

      'charts': {
        templateUrl: 'modules/rl.cpi/campaign/views/charts.html'
      },

      'recommendations': {
        templateUrl: 'modules/rl.cpi/campaign/views/recommendations.html',
        controller: 'RecommendationsCtrl',
        resolve: {
          recommendations: function (Recommendations, $stateParams) {
            return Recommendations.query($stateParams);
          }
        }
      },

      'creative-metrics': {
        templateUrl: 'modules/rl.cpi/campaign/views/creative-metrics.html',
        controller: 'CreativeMetricsCtrl'
      }
    }
  });
});
