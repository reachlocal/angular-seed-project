/**
 * Fetch validation rules for all publishers for the specified campaignId
 * Usage:
 *   var rules = PublisherTextCreativeRules.allByCampaignId(1234);
 *   var googleRule = rules.forPublisherId(42);
 *   googleRule.maxChars('headLines', 0); // returns 35
 *   googleRule.headLines[0].charCount; // Also return 35
 *
 * See the defaultRule var for the rule format.
 * Note:  If we don't have a rule, we'll return the default rule.
 *        Rules are loaded a-sync.  If we get a rule that we didn't
 *        have before, we'll update it.
 */
angular
  .rlmodule('rl.cpi.main.services.PublisherTextCreativeRules', ['ngResource', 'rl.cpi.main.Config'])
  .factory('PublisherTextCreativeRules', function ($resource, Config) {

    // This is the resource we'll use to fetch rules for each campaignId
    var baseUrl = Config.gatewayBaseUrl + '/campaigns/:campaignId/publisher-text-creative-rules';
    var defaultParams = {};
    var customMethods = { query: { method: 'GET', isArray: true, cache: true } };
    var resource = $resource(baseUrl, defaultParams, customMethods);

    function RuleSet(campaignId) {
      // Rules that may or may not be totally made up (we populate with real rules as available)
      var localRules = {};
      // Default rules - If we don't have rules for the specified publisher, use this
      function DefaultRuleTemplate(publisherId) {
        this.headLines = [ { charCount: 35, required: true } ];
        this.descriptiveLines = [ { charCount: 35, required: true }, { charCount: 35, required: false } ];
        this.publisherName = "UNKNOWN";
        this.publisherId = publisherId;
        var that = this; // Closure is safer than referencing 'this'
        /**
         * What is the max number of chars permitted for the specified attribute/index
         * Ex: maxChars("headLines", 0); // returns 35
         * @param attribute  "headLines" or "descriptiveLines"
         * @param index Int
         */
        this.maxChars = function maxChars(attribute, index) {
          return that[attribute][index].charCount;
        };
      }

      /**
       * Factory for building a default rule object using the DefaultRuleTemplate
       */
      function defaultRule(publisherId) {
        return new DefaultRuleTemplate(publisherId);
      }
      this.defaultRule = defaultRule;

      /**
       * Get all rules for the specified publisher id
       * If we don't know them, make up some defaults :P
       */
      function forPublisherId(publisherId) {
        if (!localRules.hasOwnProperty(publisherId)) {
          var blankRule = defaultRule(publisherId);
          localRules[publisherId] = blankRule;
        }
        return localRules[publisherId];
      }
      this.forPublisherId = forPublisherId;

        /**
       * Load the official rule-set and update any rules that were
       * already returned using the defaultRuleTemplate
       * @param rules Array
       */
      function loadOfficialRules(rules) {
        angular.forEach(rules, function (value) {
          var publisherId = value.publisherId;
          var localRule = forPublisherId(publisherId); // Get a reference to the local rule
          angular.extend(localRule, value); // Overwrite rule object without breaking references
        }, this);
      }

      resource.query({ campaignId: campaignId })
        .$promise
        .then(loadOfficialRules);
    }

    /**
     * CACHING: If we get multiple requests for the same campaignId, just return a reference
     * to the first one.  This prevents a slew of duplicate requests (and potentially duplicate
     * errors)
     */
    var ruleSets = {};
    function allByCampaignId(campaignId) {
      if (!ruleSets.hasOwnProperty(campaignId)) {
        ruleSets[campaignId] = new RuleSet(campaignId);
      }
      return ruleSets[campaignId];
    }

    return { allByCampaignId: allByCampaignId };
  });
