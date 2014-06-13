angular
  .rlmodule('rl.cpi.main.services.Creatives', ['rl.cpi.main.Config'])
  .factory('Creatives', function (Config, $http) {
    var baseUrl = Config.gatewayBaseUrl + '/campaigns/:campaignId/text-creatives/:id';
    var deleteUrl = Config.gatewayBaseUrl + '/campaigns/:campaignId/staged-text-creatives/:id';

    function toUrl (params, url) {
      return (url || baseUrl)
        .replace(':campaignId', (params.campaignId || ''))
        .replace(':id', (params.id || ''));
    }

    function Creative (data) {
      angular.extend(this, data);
      this._original = data;
      angular.extend(this, this._staged);
    }

    Creative.query = function query (params) {
      return $http.get(toUrl(params)).then(function (response) {
        return response.data.map(function (data) {
          return new Creative(data);
        });
      });
    };

    Creative.prototype.__defineGetter__('self', function() {
      var links = this._staged? this._staged.links : [];
      return (links.filter(function (link) {
        return link.rel === 'self';
      })[0] || {}).href;
    });

    Creative.prototype.$update = function () {
      return $http.put(toUrl(this), this);
    };

    Creative.prototype.$remove = function () {
      return $http.delete(toUrl(this, deleteUrl));
    };

    Creative.prototype.$create = function (params) {
      return $http.post(toUrl(params), this);
    };

    Creative.prototype.isStaged = function () {
      return this.status === 'STAGED' || ((this._staged !== null) && (this._staged !== undefined));
    };

    Creative.prototype.setStaged = function () {
      this.status = 'STAGED';
    };

    Creative.prototype.hasChanged = function (attribute) {
      return !angular.equals(this[attribute], this._original[attribute]);
    };

    return Creative;
  })
  .factory('CreativeHeaders', function () {
    return {
      impressions: {
        name: 'Impressions',
        shortName: 'Imp',
        description: 'An impression is counted every time the creative is displayed',
        format: 'integer'
      },
      totalCost: {
        name: 'Total Cost',
        shortName: 'Cost',
        format: 'currency'
      },
      leads: {
        name: 'Lead Count',
        shortName: 'LEADS',
        format: 'integer'
      },
      costPerLead: {
        name: 'Cost Per Lead',
        shortName: 'CPL',
        format: 'currency'
      },
      clicks: {
        name: 'Clicks',
        description: 'The Clicks column in your reports indicates how many times your advertisements were clicked by visitors',
        format: 'integer'
      },
      clickThroughRate: {
        name: 'Click Through Rate',
        shortName: 'CTR',
        description: 'Click through rate',
        format: 'percent'
      },
      conversions: {
        name: 'Conversions',
        shortName: 'CONV',
        description: 'How often users who click through an ad convert to potential leads',
        format: 'percent'
      },
      averagePosition: {
        name: 'Average Position',
        shortName: 'POS',
        description: 'When a list of ads is shown, this ad shows up in this row',
        format: 'decimal'
      },
      qualityScore: {
        name: 'Quality Score',
        shortName: 'QSCORE',
        description: 'How much google loves you',
        format: 'decimal'
      }
    };
  });
