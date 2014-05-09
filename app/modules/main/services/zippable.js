angular
  .rlmodule('rl.cpi.main.services.Zippable', ['underscore'])
  .factory('Zippable', function (_) {
    function Zippable(collection, key, alias) {
      var index = {};

      // Rewrite collection using supplied key
      collection = _.map(collection, function (value, idx) {
        var entry = {};
        entry[alias] = value;
        if (!value.hasOwnProperty(key)) {
          throw "Zippable: Your input collection '" + alias + "' is missing keys '" + key + "'";
        }
        if (index[value[key]]) {
          throw "Zippable: Your input collection '" + alias + "' has duplicate keys '" + key + "'";
        }
        index[value[key]] = entry;
        return entry;
      });

      collection.alias = alias;

      collection.byKey = function (wantedKey) {
        return index[wantedKey];
      };
      collection.zip = function (other) {
        if (!angular.isFunction(other.byKey)) {
          throw "Other collection is not a Zippable";
        }
        // change the collection to include other
        _.each(collection, function (rowLeft) {
          var thisKey = rowLeft[alias][key];
          var otherRow = other.byKey(thisKey) || null;
          rowLeft[other.alias] = (otherRow) ? otherRow[other.alias] : null;
        });
        return collection;
      };
      return collection;
    }

    return {
      build: function (collection, key, alias) {
        return Zippable(collection, key, alias);
      }
    };
  });
