angular
  .rlmodule('rl.cpi.main.services.CampaignOverview', ['ngResource', 'rl.cpi.main.Config'])
  .factory('CampaignOverview', function ($resource, Config) {
    return $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/overview-data');
  });