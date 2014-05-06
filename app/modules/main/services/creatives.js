angular
    .rlmodule('rl.cpi.main.services.Creatives', ['ngResource', 'rl.cpi.main.Config'])
    .factory('Creatives', function($resource, Config) {
        var Creative = $resource(
            Config.gatewayBaseUrl + '/campaigns/:campaignId/text_creatives/:textCreativeId',
            { 'campaignId': '@campaignId', 'textCreativeId': '@id' },
            { 'update': { method: 'PUT' } }
        );

        Creative.prototype.isStaged = function() {
          return this.status === 'STAGED';
        };

        Creative.prototype.setStaged = function() {
          this.status = 'STAGED';
        };

        return Creative;
    })
    .factory('CreativeHeaders', function() {
        return {
            impressions: {
                name: "Impressions",
                shortName: "Imp",
                description: "An impression is counted every time the creative is displayed",
                format: "integer"
            },
            totalCost: {
                name: "Total Cost",
                shortName: "Cost",
                format: "currency"
            },
            leads: {
                name: "Lead Count",
                shortName: "LEADS",
                format: "integer"
            },
            costPerLead: {
                name: "Cost Per Lead",
                shortName: "CPL",
                format: "currency"
            },
            clicks: {
                name: "Clicks",
                description: "The Clicks column in your reports indicates how many times your advertisements were clicked by visitors",
                format: "integer"
            },
            clickThroughRate: {
                name: "Click Through Rate",
                shortName: "CTR",
                description: "Click through rate",
                format: "percent"
            },
            conversions: {
                name: "Conversions",
                shortName: "CONV",
                description: "How often users who click through an ad convert to potential leads",
                format: "percent"
            },
            averagePosition: {
                name: "Average Position",
                shortName: "POS",
                description: "When a list of ads is shown, this ad shows up in this row",
                format: "decimal"
            },
            qualityScore: {
                name: "Quality Score",
                shortName: "QSCORE",
                description: "How much google loves you",
                format: "decimal"
            }
        };
    });
