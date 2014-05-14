angular
  .rlmodule('rl.cpi.main.services.AdgroupFilter', ['ui.router', 'underscore'])
  .service('AdgroupFilter', function ($location, $state, _) {
    function toArray(value) {
      var string = (value || '').toString();
      var exploded = string.split(',');
      return _.without(exploded, '');
    }

    function AdgroupFilter() {
      var registeredAdgroups = {};

      function getCurrent() {
        var result = toArray($location.search().adgroups);
        return result;
      }

      // Are we filtering *any* adgroups?
      this.isFiltering = function () {
        return getCurrent().length > 0;
      };
      // Is the specified adgroup id supposed to be displayed?
      this.isDisplayed = function (adgroupId) {
        var current = getCurrent();
        return _.contains(current, adgroupId.toString());
      };
      // Add this adgroup id to the filter
      this.add = function (adgroupId) {
        var current = getCurrent();
        current.push(adgroupId.toString());
        current = _.uniq(current);
        $location.search('adgroups', current.toString());
        $state.go($state.current);
      };
      // Remove this adgroup id from the filter
      this.remove = function (adgroupId) {
        var current = getCurrent();
        current = _.without(current, adgroupId.toString());
        $location.search('adgroups', current.toString());
        $state.go($state.current);
      };
      // Don't filter anything
      this.clear = function (adgroupId) {
        $location.search('adgroups', '');
        $state.go($state.current);
      };
      // Inform this service about each unique name/id combo
      this.registerAdgroup = function (name, id) {
        if (!registeredAdgroups[name]) {
          registeredAdgroups[name] = [];
        }
        registeredAdgroups[name].push(id);
      };
      // Return array of strings - all unique adgroup names
      this.allRegisteredNames = function () {
        return Object.keys(registeredAdgroups);
      };
      // Add all adgroups wit this name to the filter
      this.addAllByName = function (name) {
        _.each(registeredAdgroups[name], function (adgroupId) {
          this.add(adgroupId);
        }, this);
      };
      // Remove all adgroups with this name to the filter
      this.removeAllByName = function (name) {
        _.each(registeredAdgroups[name], function (adgroupId) {
          this.remove(adgroupId);
        }, this);
      };
    }

    return new AdgroupFilter();
  });
