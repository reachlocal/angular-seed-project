angular
  .rlmodule('rl.cpi.main.services.Recommendations',
  ['ngResource',
    'rl.cpi.main.Config',
    'rl.cpi.main.services.ResourceWithModel'
  ]
)
  .factory('RecommendationsModel', function () {
    function Recommendations(items) {
      var that = {};

      that.items = items;

      that.hasActiveRecommendations = function () {
        return items.length > 0;
      };
      that.count = function () {
        return items.length;
      };

      return that;
    }

    return {
      build: function (items) {
        return Recommendations(items);
      }
    };
  })
  .factory('Recommendations', function ($resource, ResourceWithModel, RecommendationsModel, Config) {
    var resource = $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/recommendations');

    return ResourceWithModel(resource, RecommendationsModel);
  });
