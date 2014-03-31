angular
    .rlmodule('rl.cpi.main.services.Zippable', ['underscore'])
    .factory('Zippable', function(_) {
        function Zippable(collection, key, alias) {
            var index = _.indexBy(collection, key);
            if (_.size(index) < collection.length) {
                throw "Your input collection '" + alias + "' has duplicate keys";
            }

            this.alias = alias;

            this.byKey = function(wantedKey) {
                return index[wantedKey];
            };
            this.zip = function(other) {
                var zipped = [];
                _.each(collection, function(rowLeft) {
                    var rowKey = rowLeft[key];
                    var rowRight = other.byKey(rowKey);
                    var newRow = {};
                    newRow[alias] = rowLeft;
                    newRow[other.alias] = rowRight || null;
                    zipped.push(newRow);
                }, this);
                return zipped;
            };
        }
        return {
            build: function(collection, key, alias) {
                return new Zippable(collection, key, alias);
            }
        };
    });
