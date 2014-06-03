angular
  .rlmodule('rl.cpi.main.services.PublisherFilterService', ['ui.router', 'underscore'])
  .service('PublisherFilterService', function ($location, $state, _) {
    function PublisherFilterService() {
      this.publishers = [];
      this.selectedPublisher = null;
      this.selectedAdGroup = null;

      this.isFiltering = function () {
        return !!this.selectedPublisher;
      };
      this.isDisplayed = function (creative) {
        if (!this.isFiltering()) {
          return true;
        }
        var publisherNameMatches = creative.publisher.name === this.selectedPublisher.publisher.name;
        var adGroupMatches = creative.adGroup.name === this.selectedAdGroup || !this.selectedAdGroup;
        return publisherNameMatches && adGroupMatches;
      };

      function publisherName(creative) {
        return creative.publisher.name;
      }

      function adGroupName(creative) {
        return creative.adGroup.name;
      }

      function uniqueAdGroups(creatives, publisherKey) {
        return [
          publisherKey,
          creatives[0].publisher,
          _.chain(creatives).uniq(false, adGroupName).map(adGroupName).value()
        ];
      }

      function toObject(entry) {
        // entry is = "GoogleNATIONAL", 'Google', [adg1, adg2, adg3, ...])
        return {
          publisher: entry[1],
          adGroups: entry[2]
        };
      }

      this.load = function (creatives) {
        this.publishers = _.chain(creatives).groupBy(publisherName)
          .map(uniqueAdGroups)
          .map(toObject)
          .value();
      };
    }

    return new PublisherFilterService();
  });
