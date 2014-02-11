angular
    .rlmodule('rl.cpi.main.services.campaignOverview', ['ngResource', 'rl.cpi.main.config'])
    .factory('CampaignOverview', function($resource, Config) {
        return $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/overview_data');
    });