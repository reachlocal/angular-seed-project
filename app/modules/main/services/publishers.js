angular
  .rlmodule('rl.cpi.main.services.Publishers', ['ngResource', 'rl.cpi.main.Config'])
  .factory('Publishers', function ($resource, Config) {
    return $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/web_publisher_campaigns');
  });