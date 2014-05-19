angular.rlmodule('rl.cpi.campaign', [
  'ui.router',
  'rl.daterange',
  'rl.QueryParams',
  'rl.stick'
])

.config(function ($stateProvider) {
  $stateProvider.state('cpi.campaign', { url: '',
    data: { title: 'Campaign Overview' },
    abstract: true,
    templateUrl: 'modules/rl.cpi/campaign/campaign.html',
    controller: function ($scope, creatives) {
      $scope.creatives = creatives;
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
        templateUrl: 'modules/rl.cpi/campaign/filters/filters.html',
        controller: 'FiltersCtrl'
      },

      'charts': {
        templateUrl: 'modules/rl.cpi/campaign/charts/charts.html'
      },

      'recommendations': {
        templateUrl: 'modules/rl.cpi/campaign/recommendations/recommendations.html',
        controller: function ($scope, recommendations) {
          $scope.recommendations = recommendations;
        },
        resolve: {
          recommendations: function (Recommendations, $stateParams) {
            return Recommendations.query($stateParams);
          }
        }
      },

      'creative-metrics': {
        templateUrl: 'modules/rl.cpi/campaign/creative-metrics/creative-metrics.html',
        controller: 'CreativeMetricsCtrl'
      }
    }
  });
});
