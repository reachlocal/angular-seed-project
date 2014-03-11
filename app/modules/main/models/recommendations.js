angular
    .rlmodule('rl.cpi.main.models.Recommendations', [])
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

            that.items = items.map(Recommendation);


            that.hasActiveRecommendations = function() {
                return items.length > 0;
            };
            that.count = function() {
                return items.length;
            };

            return that;
        }

        return {
            build: function(items) { return Recommendations(items); }
        };
    });
