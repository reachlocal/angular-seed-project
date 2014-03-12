angular
    .rlmodule('rl.cpi.main.services.Recommendations',
            ['ngResource',
             'rl.cpi.main.Config',
             'rl.cpi.main.services.ResourceWithModel'
            ]
    )
    .factory('RecommendationsModel', function() {
        function Recommendation(item) {
            var expanded = false;
            item.toggleExpanded = function() {
                expanded = !expanded;
            };
            item.isExpanded = function() {
                return expanded;
            };
            return item;
        }

        function Recommendations(items) {
            var that = {};
            var showWellDoneMessage = true;

            that.items = items.map(Recommendation);

            that.hasActiveRecommendations = function() {
                return items.length > 0;
            };
            that.showWellDoneMessage = function() {
                return (items.length === 0) && showWellDoneMessage;
            };
            that.closeWellDoneMessage = function() {
                showWellDoneMessage = false;
            };
            that.count = function() {
                return items.length;
            };

            return that;
        }
        return {
            build: function(items) { return Recommendations(items); }
        };
    })
    .factory('Recommendations', function($resource, ResourceWithModel, RecommendationsModel, Config) {
        var resource = $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/recommendations');

        return ResourceWithModel(resource, RecommendationsModel);
    });
